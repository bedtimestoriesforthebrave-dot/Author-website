// Explicit, manual step: derives web media for the A Chain of Pain case study from raw captures.
// Raw sources in media-inbox/ are never modified, committed or published. Not part of `npm run build`.
// Usage: FFMPEG=/path/to/ffmpeg node scripts/prepare-game-media.mjs   (FFMPEG defaults to `ffmpeg` on PATH)
import { spawnSync } from 'node:child_process';
import { mkdir, stat, unlink } from 'node:fs/promises';
import sharp from 'sharp';

const source = 'media-inbox';
const target = 'assets/portfolio/a-chain-of-pain';
const images = ['manor-staircase', 'hospital-main-lobby', 'reception', 'hunter-unsuspicious', 'hunter-suspicious', 'chase', 'locked-door', 'hospital-lab-flash-off', 'hospital-lab-flash-on'];
const widths = [960, 1600];
// Dark captures: high quality and full chroma keep shadow detail from turning into flat blocks.
const webp = { quality: 86, effort: 6, smartSubsample: true };
const ffmpeg = process.env.FFMPEG ?? 'ffmpeg';

await mkdir(target, { recursive: true });
for (const name of images) {
  for (const width of widths) {
    const output = `${target}/${name}-${width}.webp`;
    const info = await sharp(`${source}/${name}.png`).removeAlpha().resize({ width, kernel: 'lanczos3' }).webp(webp).toFile(output);
    console.log(`${output} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
  }
}

function run(args) {
  const result = spawnSync(ffmpeg, ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`ffmpeg failed: ${args.join(' ')}`);
}
const video = `${source}/showcase-a-chain-of-pain.mp4`;
// 720p H.264 High with a bitrate ceiling; aq-mode 3 favours dark flat areas. AAC 160 kbps keeps footsteps, ambience and music intact.
run(['-i', video, '-vf', 'scale=1280:720:flags=lanczos', '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.0', '-preset', 'slow', '-crf', '22', '-maxrate', '2600k', '-bufsize', '5200k', '-tune', 'film', '-x264-params', 'aq-mode=3', '-pix_fmt', 'yuv420p', '-g', '60', '-c:a', 'aac', '-b:a', '160k', '-ac', '2', '-ar', '48000', '-movflags', '+faststart', `${target}/gameplay-showcase.mp4`]);
// Poster from the manor entrance (12 s) rather than the capture at the end of the sequence.
run(['-ss', '12', '-i', video, '-frames:v', '1', '-vf', 'scale=1280:720:flags=lanczos', `${target}/gameplay-showcase-poster.png`]);
await sharp(`${target}/gameplay-showcase-poster.png`).webp(webp).toFile(`${target}/gameplay-showcase-poster.webp`);
await unlink(`${target}/gameplay-showcase-poster.png`);
for (const file of ['gameplay-showcase.mp4', 'gameplay-showcase-poster.webp']) console.log(`${target}/${file} ${((await stat(`${target}/${file}`)).size / 1048576).toFixed(1)} MB`);
