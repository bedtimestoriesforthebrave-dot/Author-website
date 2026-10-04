import type { LocaleCopy } from './model';

// Portfolio-authored presentation only. No duplicate technical metadata or documents.
export const finnish: LocaleCopy = {
  site: {
    role: 'Ohjelmisto- ja tekoälykehittäjä',
    location: 'Ulvila, Suomi',
    title: 'Ville Lähteenmäki — Ohjelmisto- ja tekoälykehittäjä',
    description: 'Ohjelmistoja, tietoon pohjautuvaa tekoälyä ja reaaliaikaisia järjestelmiä. Ville Lähteenmäen valitut kehitystyöt: ReorderOps, A Chain of Pain, StoryCodex ja Author Website.',
    hero: {
      label: 'Oma portfolio / Valitut työt',
      lines: ['Ohjelmistoja.', 'Tekoälyä.', 'Tehty harkiten.'],
      summary: 'Rakennan luotettavia ohjelmistoja, tekoälyavusteisia työnkulkuja ja käytännön automaatiota. Hankintapäätöksistä reaaliaikaisiin pelijärjestelmiin.',
    },
    navigationLabels: { work: 'Projektit', approach: 'Työtapa', background: 'Tausta', contact: 'Yhteystiedot' },
    cvLabel: 'CV · PDF', cvDownloadLabel: 'Lataa CV',
    selection: 'Valikoima viimeaikaisia ja teknisesti olennaisia töitä.',
    workflow: {
      title: 'Nopeuta työtä.\nVarmista tulos.',
      summary: 'Tekoäly tukee toteutusta, analyysiä ja iterointia. Oikeellisuus varmistetaan testeillä, tarkastuksilla ja validoinnilla. ReorderOps tekee tämän eron näkyväksi sekä kehitystyössä että itse tuotteessa.',
      steps: [
        { title: 'Määrittele rajat', description: 'Jaa ongelma tietosopimuksiin, deterministisiin sääntöihin ja selkeästi rajattuihin toimintoihin.' },
        { title: 'Toteuta pienissä osissa', description: 'Käytä koodausagentteja rajatun kontekstin kanssa toteutuksessa, virheenjäljityksessä ja katselmoinnissa. Pidä muutokset tarkasteltavina Gitissä.' },
        { title: 'Haasta tulos', description: 'Testaa virhetilanteita, vanhentunutta tilaa, virheellisiä syötteitä ja hyökkääviä kehotteita. Vertaa tekoälyn selityksiä taustajärjestelmän tietoihin.' },
        { title: 'Varmista ennen toimintoa', description: 'Tarkasta toiminta ja sen perustelut. Säilytä tiedossa olevat rajoitteet ja käytä determinististä varatoimintoa, kun tekoälyyn ei voi luottaa.' },
      ],
    },
    skillLabels: { core: 'Ohjelmointikielet', development: 'Sovelluskehitys', ai: 'Tekoäly ja kehitystyö', infrastructure: 'Data ja infrastruktuuri' },
    skillTerms: { llmApis: 'LLM-rajapinnat', codingAgents: 'Koodausagentit', aiEvaluation: 'Tekoälyn arviointi', promptContext: 'Kehotteiden ja kontekstin suunnittelu', aiDebugReview: 'Tekoälyavusteinen virheenjäljitys ja katselmointi', restApis: 'REST-rajapinnat' },
    earlier: 'Muuta kokemusta on kertynyt Kotlinista ja Jetpack Composesta, C#:sta ja .NET MAUIsta, UiPath StudioX:stä, Power BI:stä ja Power Pivotista sekä Power Appsista ja Power Automatesta mobiilisovellusten, automaation ja opintoprojektien kautta.',
    background: {
      title: 'Käytännön järjestelmiä.\nLaajempi näkökulma.',
      summary: 'Työni ulottuu liiketoimintasovelluksista mobiiliohjelmistoihin ja vuorovaikutteisiin ympäristöihin. Yhteistä niille on monimutkaisen toiminnan tekeminen ymmärrettäväksi, tarkasteltavaksi ja hyödylliseksi.',
      education: { institution: 'Savonia-ammattikorkeakoulu', qualification: 'IT-tradenomiopinnot (Business Information Technology)', note: 'Ohjelmistokehitystä, tiedonhallintaa, analytiikkaa, automaatiota ja projektityötä. Valmistumista ei ole vahvistettu.' },
    },
    contact: { title: 'Ota yhteyttä.', description: 'Ohjelmistokehitys, AI, tekniset projektit tai työmahdollisuudet.' },
  },
  evidencePath: ['Data', 'Deterministinen logiikka', 'Jäsennellyt perustelut', 'Tekoälyn tulkinta', 'Ihmisen hyväksyntä', 'Validoitu toiminto', 'Tapahtumaloki'],
  projects: {
    reorderops: {
      category: 'Varastonhallinta ja hankintasuunnittelu',
      description: 'Varastotiedoista hankintapäätökseen, jonka perusteet voi tarkastaa.',
      summary: 'Deterministinen hankintasuunnittelu, muuttumattomat perustelut ja tuloksia selittävä tekoälyavustaja. Ihminen tarkastaa päätöksen, ja taustajärjestelmä validoi sen uudelleen ennen sisäisen tilausluonnoksen luomista.',
      role: 'Sovelluksen suunnittelu ja toteutus', status: 'Julkinen portfoliodemo',
      highlights: ['Toistettavat suunnittelusäännöt', 'Uudelleen validoitu ihmisen hyväksyntä', 'Tietoon pohjautuva tekoäly, vain luku'],
      architecture: 'React- ja TypeScript-käyttöliittymä → FastAPI-liiketoimintasäännöt → SQLiteen tallennetut perustelut ja toiminnan tila. Rajattu tekoälysovitin lukee erillistä tietopakettia; hyväksytyt toiminnot validoivat nykytilan uudelleen transaktion sisällä.',
      challenges: ['Erota historialliset havainnot synteettisistä toiminnan syötteistä.', 'Säilytä tallennetut perustelut muuttumattomina ja estä vanhentuneen tiedon hyväksyntä.', 'Käsittele tekoälyn kelvollisia viitteitä ja selitystekstin oikeellisuutta erillisinä varmennusongelmina.'],
      verification: ['Automaattiset tarkistukset kattavat virheelliset syötteet, tulosten toistamisen, rinnakkaisuuden, peruutukset, vanhentuneen tiedon hyväksynnät ja vierailijoiden eristämisen.', 'Monikieliset, epäsiistejä syötteitä käsittelevät ja hyökkäävät tekoälyarvioinnit säilyttävät havaitut merkitys- ja kielivirheet.', 'Dokumentoitu planning-v1.4-vaihe raportoi 303 läpäistyä taustajärjestelmän testiä Pythonin versioilla 3.11 ja 3.12 sekä Ruff-, TypeScript- ja tuotantokoontitarkistukset. Tämä on projektin lähdeaineistoa, ei tämän portfolion testimäärä.'],
      linkLabels: { demo: 'Avaa demo', github: 'Lähdekoodi', caseStudy: 'Lue projektiesittely' },
      mediaText: { alt: 'ReorderOpsin julkinen varastonäkymä: historiallinen suunnittelupäivä, ilmoitus synteettisestä datasta, varastomittarit ja tuotetaulukko.', caption: 'Julkinen demo / Varaston tarkastelu. Kuvattu 3.10.2026. Kaikki näkyvät toiminnan tiedot ovat synteettisiä.' },
      study: [
        { title: 'Ongelma', paragraphs: ['Varastosuunnittelijan täytyy ymmärtää, mitkä tuotteet vaativat huomiota, miksi ja minkä toimenpiteen voi turvallisesti ottaa tarkasteluun. Pieni varasto ei yksin ole tilausohje: saapuvat toimitukset, toimitusajat, kysynnän muutokset ja toimittajan ehdot vaikuttavat päätökseen.', 'Ensimmäinen historiallisten tietojen tarkastelu käytti kiinteitä riittävyysluokkia. Ne tuottivat lähdeaineistossa paljon kohinaa. Tuotekohtaiset prosenttipisteet paransivat vertailua, mutta historiallisesti tavallinen varastotaso ei välttämättä kata toimittajan toimitusaikaa. Hankintasuunnittelusta tehtiin siksi erillinen deterministinen laskenta.'] },
        { title: 'Toistettava suunnittelu', paragraphs: ['Liiketoimintasäännöt ennustavat varastotilannetta ja laskevat täydennystarpeen toimitusaikojen, varmuusvaraston, vähimmäistilausten ja pakkauskokojen perusteella. Tallennetut ajot säilyttävät syötteet, laskentaversion ja syötteiden sormenjäljen sen sijaan, että vanhoja perusteluja laskettaisiin huomaamatta uudelleen.'], bullets: ['FILTER-420: suositus on 210 yksikköä, ja aiempaan puutteeseen liittyy kiirehtimisen tarkastelu.', 'VALVE-88: alkuperäinen 75 yksikön tarve kasvaa 120 yksikköön toimittajan vähimmäistilauksen vuoksi.', 'BELT-210: ajoissa saapuva toimitus estää päällekkäisen tilauksen.', 'BEARING-51: kysyntäpoikkeama pysäyttää suosituksen tarkasteltavaksi.'] },
        { title: 'Ihmisen päätös, uusi validointi', paragraphs: ['Hyväksyntä lukee nykyisen varaston, saapuvat toimitukset, kysynnän ja toimittajaehdot uudelleen lyhyen SQLite-kirjoitustransaktion sisällä. Muuttuneet perustelut estävät toiminnon. Täsmälleen saman pyynnön uusiminen palauttaa alkuperäisen tuloksen, ja yksilöllisyysrajoitteet estävät toisen aktiivisen luonnoksen samalle tuotteelle.', 'Sisäiset ostotilausluonnokset eivät lähetä mitään toimittajalle eivätkä muutu vahvistetuksi saapuvaksi toimitukseksi. Onnistuneet ja estetyt toiminnot tallentuvat vain täydentyvään tapahtumalokiin. Tietokantatiedoston tai skeeman suora muokkausoikeus mahdollistaa silti tietojen muuttamisen; tallennusta ei väitetä peukaloinnin estäväksi.'] },
        { title: 'Rajattu tekoälytulkinta', paragraphs: ['GPT-6 Luna -integraatio käyttää hallittuja, vain lukuun tarkoitettuja työkaluja erillisen tietopaketin hakemiseen ja varmennettujen tietokorttien yhdistämiseen sovellukseen. Määräävät lukumäärät kuuluvat taustajärjestelmälle. Avustaja ei voi hyväksyä päätöksiä, luoda luonnoksia, muokata varastoa tai lähettää tilauksia.', 'Arvioinnit sisältävät monikielisiä kysymyksiä, epäsiistejä syötteitä ja kehoteinjektioyrityksiä. Ne paljastivat tärkeän rajoitteen: oikeat lähdeviitteet eivät takaa järkevää selitystä tai pyydettyä kieltä. Deterministinen varatoiminto säilyttää hyödylliset tiedot, kun palveluntarjoaja epäonnistuu tai käyttöraja täyttyy. Tekoälyn selitykset vaativat edelleen tarkastamista.'] },
        { title: 'Julkinen demo, eristetyt toiminnot', paragraphs: ['Vercelin käyttöliittymä ja Railwayn taustajärjestelmä esittävät generoitua historiaa yksityisen CSV-aineiston sijaan, sillä sen alkuperää ja lisenssiä ei ole vahvistettu. Vierailijat saavat erilliset väliaikaiset tietokantakopiot, jolloin luonnokset ja lokitapahtumat pysyvät erillään.', 'Pysyvä käytönhallintarekisteri varaa arvioidut tekoälykustannukset ennen palvelukutsua ja soveltaa käyttörajoja. Epävarmassa tilanteessa varaus säilytetään. Kyse on kustannusten hallinnasta, ei väitteestä mitatuista käyttösäästöistä.'] },
        { title: 'Varmennus ja avoimet rajoitteet', paragraphs: ['Testit kattavat puuttuvat ja virheelliset tiedot, laskennan raja-arvot, tallennettujen ajojen toistamisen, vanhentuneet hyväksynnät, transaktioiden peruutukset, rinnakkaisuuden, vierailijoiden eristämisen ja palautuksen. Dokumentoitu v1.4-vaihe raportoi 303 läpäistyä taustajärjestelmän testiä Pythonin versioilla 3.11 ja 3.12 sekä Ruff- ja käyttöliittymätarkistukset.', 'Dokumentoidut julkaistun demon tarkistukset kattavat hankintatoiminnot ja rajatun tekoälykäytön. Kielen luotettavuus, palveluntarjoajan käytön täsmäytys, täysi tuotantopalautus ja kylmäkäynnistyksen ajoitus vaativat vielä varmennusta. Projektissa ei ole reaaliaikaista ERP-integraatiota, tilausten lähettämistä toimittajalle, vastaanottotyönkulkua, poikkeaman ohitusta tai varsinaista käyttäjätunnistautumista. Se osoittaa teknisiä ratkaisuja, ei mitattua ennustetarkkuutta tai vähittäiskaupan säästöjä.'] },
      ],
    },
    "a-chain-of-pain": {
      "category": "Tarinavetoinen ensimmäisen persoonan kauhupeli",
      "description": "Itsenäisesti johdettu Unreal Engine 5 / C++ -peliprojekti, jossa tarina, systeeminen gameplay ja tunnelma kohtaavat.",
      "summary": "Tarinavetoinen ensimmäisen persoonan kauhupeli, jota kehitetään Unreal Engine 5:llä ja C++:lla vakiintuneen tarinan ja taustamaailman pohjalta. Nykyinen pelattava versio kulkee kartanosta sen takana olevaan sairaalaan, jossa jännitteen luovat hiiviskely, taskulamppu, äänet ja oma Hunter-AI.",
      "role": "Itsenäisesti johdettu, AI-avusteinen kehitys. Alkuperäinen soundtrack; lisensoidut ympäristöassetit.",
      "status": "Kehitteillä · pelattava versio",
      "highlights": [
        "Tarina & maailmanrakennus",
        "Gameplay- ja vihollisjärjestelmät",
        "Level design & alkuperäinen musiikki"
      ],
      "architecture": "Unreal Engine 5 / C++ yhdistää pelaajan liikkumisen ja interaktiot, systeemisen vihollis-AI:n, ympäristösuunnittelun ja reagoivan äänen.",
      "challenges": [
        "Tee pimeydestä, äänistä ja taskulampusta merkityksellisiä valintoja eikä pelkkää tunnelmaa.",
        "Pidä Hunterin havainnointi ja takaa-ajo johdonmukaisina ilman piilossa olevan pelaajan sijainnin seurantaa.",
        "Sovita navigointi, ovet, kuulo ja musiikki pelattavaan tilaan."
      ],
      "verification": [
        "Pelivideo ja kuvakaappaukset on tallennettu nykyisestä pelattavasta versiosta.",
        "Tallennettuihin kehitysajoihin sisältyy 12/12 läpäistyä skriptattua AI-regressiotestiä 17.9.2026. Tulos on projektin aiempaa näyttöä; Unreal-testejä ei ajettu uudelleen tämän portfoliopäivityksen aikana.",
        "Skriptatut PIE-tarkistukset käsittelevät havainnointia, takaa-ajoa, muistia ja kiinniottoa. Konsolikomennot, päälle piirretyt tilatiedot ja maailmaan sijoitetut merkit tukevat kohdennettua pelitestausta ja virheenjäljitystä."
      ],
      "linkLabels": {
        "demo": "Avaa demo",
        "github": "Lähdekoodi",
        "caseStudy": "Tutustu projektiin"
      },
      "mediaText": {
        "alt": "Ensimmäisen persoonan pelikuva kartanon yläaulasta: valkokaiteinen portaikko kaartuu alas hämärään eteishalliin, jossa on yksi valaistu kohta.",
        "caption": "Pelikuva / Kartanon portaikko."
      },
      "study": [
        {
          "title": "Peli",
          "paragraphs": [
            "A Chain of Pain on kehitteillä oleva tarinavetoinen ensimmäisen persoonan kauhupeli, jota tehdään Unreal Engine 5:llä ja C++:lla. Pelaaja tutkii kartanoa ja sen takana olevaa sairaalaa enimmäkseen pimeässä taskulampun varassa, samalla kun Hunter liikkuu rakennuksessa ja reagoi siihen, mitä se näkee ja kuulee.",
            "Nykyinen pelattava versio yhdistää tutkimisen, hiiviskelyn, ympäristön interaktiot, vihollis-AI:n, suuntaa antavat äänet, mukautuvan alkuperäisen soundtrackin, takaa-ajon ja kiinnioton yhdeksi yhtenäiseksi kokonaisuudeksi. Järjestelmät vaikuttavat toisiinsa: se, miten pelaaja liikkuu, mihin valo osuu ja mitkä ovet avautuvat, muuttaa Hunterin tietoja, ja Hunterin tila muuttaa musiikkia."
          ]
        },
        {
          "title": "Pelivideo",
          "paragraphs": [
            "Yhtäjaksoinen jakso nykyisestä pelattavasta versiosta. Siinä näkyvät tutkiminen, ympäristön interaktiot, hiiviskely, suuntaa antavat äänet, taskulampun herättämä vihollisen reaktio, mukautuva musiikki, takaa-ajo ja kiinniotto.",
            "Ääni on osa näyttöä: tuuli ulkona, pelaajan ja Hunterin askeleet sekä soundtrackin muutos takaa-ajon alkaessa kuuluvat tallenteella. Kuulokkeet ovat suositeltavat."
          ]
        },
        {
          "title": "Tarina ja taustamaailma",
          "paragraphs": [
            "A Chain of Painin tarinallinen perusta ja laajempi taustamaailma ovat jo pitkälle kehitettyjä, ja pelin ympäristöt ja kohtaamiset rakentuvat tämän maailman sisälle.",
            "Julkinen portfolio on tarkoituksella vapaa juonipaljastuksista: se näyttää, miten peliä pelataan ja miten se on rakennettu, mutta ei sitä, mitä tarina paljastaa."
          ]
        },
        {
          "title": "Miksi pelattavuus tuli ensin",
          "paragraphs": [
            "Ennen kuin täysi tarinallinen esitys rakennetaan pelin päälle, kehityksessä haluttiin vastaus yhteen kysymykseen mahdollisimman aikaisin: onko peli oikeasti pelottava, reagoiko se pelaajaan uskottavasti ja onko sitä mielekästä pelata?",
            "Nykyinen pelattava versio keskittyy siksi järjestelmiin, jotka luovat jännitteen ja tekevät kokemuksesta uskottavan: liikkumiseen, hiiviskelyyn, vihollisen toimintaan ja havainnointiin, pimeyteen ja taskulamppuun, pelaajan haavoittuvuuteen, ympäristön interaktioihin, ääniin, reagoivaan musiikkiin, kohtaamisiin sekä takaa-ajoon ja kiinniottoon. Tarina määrää suunnan; pelattavassa versiossa kauhua testataan ja hiotaan."
          ]
        },
        {
          "title": "Pelijärjestelmät",
          "paragraphs": [
            "Pelaaja liikkuu ensimmäisessä persoonassa eri tavoin: hiipien, kyykyssä, kävellen tai juosten. Liikkumistapa vaikuttaa askelten äänekkyyteen ja siihen, kuinka nopeasti Hunter huomaa pelaajan. Rajallinen paniikkisprintti antaa lyhyen lisävauhdin pakoon, ja se palautuu asennon mukaan.",
            "Pimeys on osa pelimekaniikkaa. Taskulamppu on usein ainoa tapa hahmottaa huone, mutta sen valokeila laajentaa Hunterin näköä ja nopeuttaa havaitsemista. Kun valo osuu Hunterin kasvoihin tai se huomaa valaistun kohdan, sillä on paikka, jota tutkia.",
            "Katseeseen perustuva interaktiojärjestelmä ohjaa ovia. Saranoidut ovet pelaaja avaa itse, automaattiset liukuovet toimivat omillaan, ja lukitut ovet näyttävät lukkokuvakkeen, joten suljetut reitit näkyvät suoraan pelimaailmassa. Sama oviluokka palvelee pelaajaa, Hunteria ja skriptattuja kohtaamisia.",
            "Kiinnijäämisellä on seurauksensa. Hunterin hyökkäykset aiheuttavat haavoja, jotka paranevat vaiheittain, ja kasautuessaan ne johtavat kriittiseen tilaan. Kiinniotto lukitsee ohjauksen, kääntää kameran Hunteria kohti ja häivyttää kuvan kuolemanäkymään, minkä jälkeen kenttä alkaa alusta uutta yritystä varten."
          ],
          "visual": {
            "kind": "integration",
            "label": "Toisiinsa kytkeytyvät pelijärjestelmät",
            "caption": "Pelaajan toiminta muuttaa sitä, mitä Hunter voi havaita; Hunterin toiminta vaikuttaa takaisin pelaajan paineeseen ja musiikkiin.",
            "items": [
              {
                "title": "Liikkuminen",
                "description": "Hiipiminen, kyykistyminen, kävely ja juoksu määräävät askelten äänen ja näkyvyyden. Rajallinen paniikkisprintti auttaa pakenemaan."
              },
              {
                "title": "Taskulamppu",
                "description": "Paljastaa ympäristön, mutta laajentaa Hunterin näköä, nopeuttaa havaitsemista ja voi jättää vihjeen."
              },
              {
                "title": "Interaktiot ja ovet",
                "description": "Uudelleenkäytettävä katseeseen perustuva rajapinta; yksi oviluokka saranoiduille, liuku- ja lukituille oville, pelaajalle, AI:lle ja kohtaamisille."
              },
              {
                "title": "Haavat ja kiinniotto",
                "description": "Haavat paranevat vaiheittain, ja mallissa on kriittinen tila. Kiinniotto johtaa kuolemanäkymään ja uuteen yritykseen."
              },
              {
                "title": "Reagoiva ääni",
                "description": "Askeleet ja ovet välittävät äänet Hunterille; musiikki seuraa sen etäisyyttä ja toimintaa."
              }
            ]
          }
        },
        {
          "title": "Maailma ja kenttäsuunnittelu",
          "paragraphs": [
            "Pelattava maailma on yksi laaja kartta, jossa on kartano ja kaksi sairaalarakennusta. Koostan tilat, kulkureitit, valaistuksen ja kohtaamisalueet lisensoiduista kolmansien osapuolten modulaarisista ympäristöasseteista; alkuperäiset assetit eivät ole omaa mallinnustyötäni. Maailman historia ja ympäristön kautta kerrottava tarina ohjaavat tilojen suunnittelua. Valaistus pitää useimmat tilat niin pimeinä, että taskulamppu ratkaisee, mitä pelaaja näkee.",
            "Kartano laajennettiin lisensoidusta rakennuksesta kolmisiipiseksi: saumakohdat poistettiin, siivet yhdistettiin uusilla oviaukoilla ja katot sekä lattiat yhtenäistettiin. Reitti kulkee pihalta kartanon läpi sairaalaan, joten tila muuttuu kodista laitokseksi sitä mukaa kuin pelaaja etenee syvemmälle.",
            "Sairaala on Hunterin aluetta: monikerroksinen rakennus, jossa on NavMesh-navigointi, partiointi- ja etsintäpisteet, pelattavia reittejä rajaavat esteet, lukittuja ovia sekä assetpakettien ovia, jotka on muunnettu projektin omaan interaktiiviseen oviluokkaan. Käsikirjoitettu encounter voi siirtyä takaisin Hunterin normaaliin systeemiseen AI-käyttäytymiseen."
          ]
        },
        {
          "title": "Hunter",
          "paragraphs": [
            "Hunter on oma C++-pohjainen vihollinen, joka partioi sairaalassa ja toimii vain sen perusteella, mitä se on todella havainnut. Se kuulee askeleet ja ovet, huomaa taskulampun ja muuttuu epäluuloiseksi ennen kuin on varma.",
            "Vaimea ääni saa sen pysähtymään kuuntelemaan; selkeä ääni lähettää sen tutkimaan. Kun pelaaja on varmistunut kohde, Hunter ryntää lyhyesti ja aloittaa takaa-ajon. Näköyhteyden katketessa se seuraa tuoreita ääniä. Kadotettuaan pelaajan se etsii viimeksi havaitsemastaan kohdasta eikä pelaajan todellisesta sijainnista, ja pysyy valppaana ennen kuin palaa partioimaan. Se avaa reitillään lukitsemattomat ovet, kunnioittaa lukittuja eikä jahtaa alueensa ulkopuolelle.",
            "Pelaajalle säännöt ovat luettavia: pysy hiljaa ja poissa valosta, niin Hunter joutuu toimimaan puutteellisen tiedon varassa. Alempana olevat tekniset osiot kertovat, miten tämä on rakennettu."
          ]
        },
        {
          "title": "Äänet ja alkuperäinen soundtrack",
          "paragraphs": [
            "Äänet ovat osa stealth-pelaamista. Pelaajan askeleet vaihtelevat pinnan ja liikkumistavan mukaan ja välittyvät Hunterin kuuloon. Hunterin askeleet laukeavat sen jalkojen osuessa maahan, joten pelaaja voi seurata sen sijaintia korvakuulolta, ja myös ovet äänittelevät liikkuessaan. Ympäristöäänet luovat jokaiselle tilalle oman luonteensa, kuten tuulen kartanon ulkopuolella.",
            "Musiikkijärjestelmä seuraa pelitilannetta: tutkiminen, vaara Hunterin ollessa lähellä, takaa-ajo sen jahdatessa tai ottaessa kiinni sekä kuolema. Tilojen välillä musiikki vaihtuu ristiinhäivytyksellä.",
            "Sävelsin pelin alkuperäisen soundtrackin. Ääniefektit ovat lisensoiduista äänikirjastoista."
          ],
          "visual": {
            "kind": "integration",
            "label": "Äänijärjestelmien suunnittelu / alkuperäinen sävellystyö",
            "caption": "Pelaajan ja Hunterin askeleet kertovat hiiviskelyn aikana, missä kukin liikkuu, ympäristöäänet rakentavat tilan tunnun, ja alkuperäinen soundtrack muuttuu pelitilanteen mukana.",
            "items": [
              {
                "title": "Äänijärjestelmien suunnittelu",
                "description": "Pinnan ja liikkumistavan huomioivat askeleet, Hunterin jalkojen osumiin perustuvat askeleet, ovien äänet ja ympäristöäänet, jotka on kytketty Hunterin kuuloon."
              },
              {
                "title": "Mukautuva musiikki",
                "description": "Tutkimisen, vaaran, takaa-ajon ja kuoleman tilat Hunterin etäisyyden ja toiminnan mukaan, ristiinhäivytyksin."
              },
              {
                "title": "Alkuperäinen soundtrack",
                "description": "Itse peliin säveltämäni alkuperäinen musiikki."
              }
            ]
          }
        },
        {
          "title": "Hahmot ja toteutus",
          "paragraphs": [
            "Pelaajahahmo laajentaa Unrealin ensimmäisen persoonan mallipohjaa hiiviskelyliikkeillä, Enhanced Input -toiminnoilla, paniikkisprintillä, haavoilla, taskulampulla ja kiinniottojaksolla. Taskulamppukomponentti pohjautuu julkiseen tutoriaaliin, ja sitä on laajennettu välittämään tietoa Hunterin havainnointiin.",
            "Hunter 1 -hahmon AI-avusteinen prototypointi ja kehitys. Hunter on jaettu aivoihin ja kehoon: AI-ohjain vastaa havainnoinnista ja päätöksistä; hahmo hoitaa liikkumistyylit, katseen suunnan, ryntäyksen, kiinnioton ja näkyvän kehonsa, jota ohjataan animaatioiden uudelleenkohdistuksella (retargeting). Hahmo on työn alla.",
            "Tekijyys: ohjaan pelisuunnittelua, arkkitehtuuri- ja toteutuspäätöksiä, kenttien koostamista, valaistusta, pelattavuuden ja AI:n suunnittelua, integraatiota, pelitestausta ja hyväksyntää, ja sävelsin soundtrackin. Koodausagentit avustavat toteutuksessa ja katselmoinnissa tämän ohjauksen alaisuudessa. Ympäristögrafiikka, hahmomallit, animaatiot ja ääniefektit ovat lisensoituja tai pelimoottorin mukana tulevia assetteja, eikä niitä esitetä omana grafiikkatyönä."
          ]
        },
        {
          "title": "Hunterin rakenne",
          "paragraphs": [
            "Hunter on rakennettu Unrealin AI Perceptionin ja StateTreen varaan. Erillinen tietokomponentti käsittelee havainnot, tunnistuksen, muistin ja etsintätiedot. Toimintatehtävät lukevat tätä komponenttia piilossa olevan pelaajan reaaliaikaisen tilan sijaan.",
            "Omat C++-tehtävät ja ehdot muodostavat StateTreen, joka generoidaan ja käännetään koodista. Näin toimintarakenne on toistettavissa ja tiedon hankinta pysyy erillään päätöksenteosta sekä ympäristöön vaikuttamisesta."
          ],
          "visual": {
            "kind": "layers",
            "label": "Hunterin arkkitehtuuri",
            "caption": "Tieto kulkee tietokomponentin kautta ennen toimintaa. Tunnistus on jatkuva havainnointiprosessi, ei erillinen toimintatila.",
            "items": [
              {
                "title": "Havainnointi",
                "description": "Näkö, ääni ja taskulampun vihjeet; näköyhteys tarkistetaan joka ruudulla."
              },
              {
                "title": "Tieto ja muisti",
                "description": "Tunnistusmittari, varmennetut sijainnit, valppaustaso ja etsinnän tiedot."
              },
              {
                "title": "Tilan valinta",
                "description": "StateTree valitsee korkeimman prioriteetin kelvollisen toiminnan."
              },
              {
                "title": "Toiminta",
                "description": "Omat C++-tehtävät tutkivat, jahtaavat, etsivät ja partioivat."
              },
              {
                "title": "Ympäristön toiminnot",
                "description": "Navigointi, lukitsemattomat ovet, kiinniotto ja pelitapahtumat."
              }
            ]
          }
        },
        {
          "title": "Kuulo huomioi reitin, ei vain etäisyyttä",
          "paragraphs": [
            "Ääntä arvioidaan kokonaisen kuljettavan NavMesh-reitin pituuden perusteella. Äänen voimakkuus vaikuttaa hyväksyttyyn kantamaan. Lähellä oleva lähde seinän takana tai toisessa kerroksessa voi siksi kuulua Hunterille heikosti, jos kulkureitti on pitkä. Kyseessä on reittigeometriaan perustuva pelimekaniikka, ei fysikaalinen akustiikkasimulaatio.",
            "Vaimea ääni saa Hunterin pysähtymään, kääntymään ääntä kohti ja kuuntelemaan. Selkeä ääni tai lyhyen ajan sisällä ensimmäisen vahvistava toinen vaimea ääni luo tutkittavan sijainnin. Pelaajan liikkumistapa vaikuttaa askelten äänenvoimakkuuteen, ja ovet ilmoittavat omat äänensä."
          ]
        },
        {
          "title": "Asteittainen näköhavainto",
          "paragraphs": [
            "Tunnistus kertyy mittariin sen sijaan, että näkyvyys olisi pelkkä kyllä–ei-kytkin. Kertymisnopeuteen vaikuttavat etäisyys, katselukulma, liikkumistapa tai asento, liike ja taskulamppu. Mittari laskee näköyhteyden puuttuessa; hyvin läheltä tunnistus tapahtuu heti. Epäily voi käynnistää tutkimisen ennen kuin varmennettu kohde johtaa takaa-ajoon.",
            "Taskulamppu vaikuttaa näkökantamaan ja tunnistukseen, ja näkyvä valokeila tai valaistu kohta voi muodostaa vihjeen. Debug-näkymä näyttää näön osatekijät, jotta toimintaa voi tarkastaa ja säätää."
          ]
        },
        {
          "title": "Muisti ilman seinien läpi näkemistä",
          "paragraphs": [
            "Kun näköyhteys katkeaa, viimeinen varmennettu sijainti ja liikesuunta säilyvät. Tuore ääni voi ylläpitää takaa-ajoa tai korvata vanhemman etsintätiedon. Kohteen menettäminen käynnistää etsinnän viimeksi havaitusta paikasta.",
            "Etsinnän alku painottuu pelaajan viimeaikaiseen kulkusuuntaan. Etsintäsäde laajenee, käytyjä paikkoja vältetään ja ehdotettujen reittien on pysyttävä alueen sisällä. Etsinnän jälkeen AlertRoam partioi katoamisalueella, kunnes valppaus laskee. Uuden kohtaamisen lyhyellä, rajatulla ryntäyksellä on palautumisaika, ja kiinniotto edellyttää ulottuvuutta, varmennettua näköyhteyttä ja lyhyttä kuljettavaa reittiä."
          ]
        },
        {
          "title": "Toiminta valitaan prioriteetin mukaan",
          "paragraphs": [
            "StateTree valitsee ensimmäisen kelvollisen tilan tässä prioriteettijärjestyksessä. Valinta tehdään uudelleen tiedon muuttuessa tai tehtävän päättyessä. Tilat kilpailevat valinnasta; ne eivät ole peräkkäisiä pelivaiheita. Kiinniotolla on myös tapahtumapohjainen ohitus. Valppaustaso on erillinen tietokomponentin arvo."
          ],
          "visual": {
            "kind": "priority",
            "label": "StateTree / korkein kelvollinen prioriteetti ensin",
            "caption": "Erillistä Detect-tilaa ei ole. Täysi tunnistusmittari mahdollistaa Chasen; uusi ääni voi ohjata Searchin sijaan Investigateen.",
            "items": [
              {
                "title": "Capture",
                "description": "Kiinniotto on aktiivinen. Tila jatkuu, kunnes kuoleman käsittely lataa kentän uudelleen."
              },
              {
                "title": "Chase",
                "description": "Varmennettu kohde on olemassa. Tuore havaittu ääni voi ohjata takaa-ajoa ilman näköyhteyttä."
              },
              {
                "title": "Investigate",
                "description": "Epäilyttävällä näköhavainnolla, selvällä tai vahvistetulla äänellä tai valovihjeellä on sijainti."
              },
              {
                "title": "Search",
                "description": "Kohde on kadonnut; etsintä käyttää säilytettyä tietoa."
              },
              {
                "title": "Listen",
                "description": "Vaimealla äänellä on sijainti, mutta havaintoa ei ole vielä vahvistettu."
              },
              {
                "title": "AlertRoam",
                "description": "Hunter on edelleen valppaana ilman kohdetta."
              },
              {
                "title": "Roam",
                "description": "Partiointi, kun mikään korkeamman prioriteetin ehto ei täyty."
              }
            ]
          }
        },
        {
          "title": "Tekninen työ ja iterointi",
          "paragraphs": [
            "Vaiheittainen kehitys käyttää Gitiä, Git LFS:ää ja One File Per Actor -rakennetta. Uudelleenkäytettävät komponentit erottavat havainnoinnin, hahmon toiminnot, interaktiot, haavat ja äänen. AI:n säätöarvot ovat pelin aikana luettavassa data-assetissa, joten arvoja voi säätää hajauttamatta vakioita toimintakoodiin."
          ],
          "bullets": [
            "Konsolin testikomennot, visuaaliset merkit ja tilanäkymät näyttävät tunnistuksen, kuulopäätökset, muistetut sijainnit ja etsinnän kohteet.",
            "Python-työkalut tukevat skriptattuja PIE-regressiotarkistuksia ja vievät kenttägeometrian mittakaavaisiksi pohjapiirroksiksi.",
            "Dokumentoidut reiluussäännöt, hyväksymiskriteerit ja pienet kehitysvaiheet määrittävät, mitä Hunter saa tietää, ja pitävät toteutuksen ja katselmoinnin rajattuina."
          ],
          "note": "Projektista voidaan tarvittaessa esitellä gameplayta, AI-debug-näkymiä ja teknistä toteutusta tarkemmin."
        }
      ],
      "mediaSlots": {
        "showcase": {
          "title": "Pelivideo",
          "description": "Yhtäjaksoinen jakso nykyisestä versiosta: tutkiminen, ovet, hiiviskely, suuntaa antavat äänet, taskulampulla provosointi, takaa-ajo, mukautuva musiikki ja kiinniotto.",
          "alt": "Pelivideo: pelaaja kulkee kartanon pihalta sairaalaan, piiloutuu Hunterilta taskulamppu sammutettuna, herättää sen huomion valolla, joutuu takaa-ajetuksi umpikujaan ja jää kiinni.",
          "caption": "Pelivideo / Nykyinen pelattava versio · 1 min 41 s · äänellinen. Ympäristögrafiikka lisensoiduista assetpaketeista.",
          "sequence": [
            "Kartanoa lähestytään ulkona, taustalla tuulen ääni.",
            "Kartanoon mennään sisään ja sen läpi kuljetaan kohti sairaalaa.",
            "Automaattiset liukuovet ja käsin avattavat ovet.",
            "Sairaalaa tutkitaan taskulampun valossa; pelaajan ja Hunterin askeleet kuuluvat.",
            "Lähistöltä kuuluu jotain, ja pelaaja reagoi siihen.",
            "Taskulamppu sammutetaan, ja pelaaja odottaa näkymättömissä oviaukon takana.",
            "Hunteria provosoidaan tarkoituksella taskulampulla.",
            "Havaitseminen, takaa-ajo ja soundtrackin muutos takaa-ajon musiikiksi.",
            "Pakoyritys päättyy umpikujaan, ja pelaaja jää kiinni."
          ]
        },
        "flashlight": {
          "title": "Taskulamppu pois ja päällä",
          "description": "Sama sairaalan laboratorion oviaukko taskulamppu sammutettuna ja päällä.",
          "alt": "Sairaalan laboratorion oviaukko lähes pimeänä; huoneesta ja seinän julisteista erottuvat vain hämärät muodot.",
          "compareAlt": "Sama laboratorion oviaukko pelaajan kädessä olevan taskulampun valaisemana; huone, kaapit ja seinän julisteet näkyvät selvästi.",
          "labels": ["Taskulamppu pois", "Taskulamppu päällä"],
          "caption": "Pelikuva / Sama sairaalan laboratorio taskulamppu sammutettuna ja päällä. Valo paljastaa huoneen, mutta samalla Hunterin on helpompi havaita pelaaja."
        },
        "locked-door": {
          "title": "Lukitun reitin palaute",
          "description": "Lukittu ovi ja sen lukkokuvake taskulampun valossa.",
          "alt": "Sairaalan ovi, jonka ikkuna on rikki, pelaajan taskulampun valaisemana. Ovessa näkyy riippulukon kuvake ja teksti Locked.",
          "caption": "Pelikuva / Lukittu ovi näyttää tilansa pelimaailmassa, kun pelaaja katsoo sitä."
        },
        "manor-staircase": {
          "title": "Kartanon portaikko",
          "description": "Kartanon pääportaikko ja eteishalli.",
          "alt": "Ensimmäisen persoonan pelikuva kartanon yläaulasta: valkokaiteinen portaikko kaartuu alas hämärään eteishalliin, jossa on yksi valaistu kohta.",
          "caption": "Pelikuva / Kartanon pääportaikko. Koostaminen ja valaistus lisensoidussa rakennuksessa, joka on laajennettu kolmisiipiseksi."
        },
        "hospital-lobby": {
          "title": "Sairaalan aula",
          "description": "Sairaalan pääaula taskulampun valossa.",
          "alt": "Rapistunut sairaalan aula, jossa on sinisiä odotustuoleja, roskaa lattialla ja lasiovia, pelaajan taskulampun valaisemana.",
          "caption": "Pelikuva / Sairaalan pääaula. Koostaminen, valaistus ja pelillinen rakenne lisensoidussa sairaalaympäristöpaketissa."
        },
        "reception": {
          "title": "Vastaanotto",
          "description": "Pimeä vastaanottotila yhden valonlähteen varassa.",
          "alt": "Pimeä sairaalan vastaanottotila: tiski ja kärry heikossa valokeilassa, suljettu ovi ja varjoon jäävät istuimet.",
          "caption": "Pelikuva / Vastaanottotila. Useimmat tilat ovat niin pimeitä, että valo ratkaisee, mitä pelaaja näkee."
        },
        "hunter-unaware": {
          "title": "Hunter partioi",
          "description": "Hunter kaukaisena siluettina, tietämättä pelaajasta.",
          "alt": "Pimeä sairaalakäytävä oviaukosta nähtynä; Hunterin siluetti seisoo kaukana käytävän valaistussa päässä.",
          "caption": "Pelikuva / Hunter partioi käytävän päässä eikä ole vielä huomannut pelaajaa."
        },
        "hunter-suspicious": {
          "title": "Taskulampun herättämä epäily",
          "description": "Debug-teksti näyttää Hunterin tutkivan, kun valo osui sen kasvoihin.",
          "alt": "Taskulampun valaisema odotustila, jonka käytävän päässä on Hunter. Debug-tekstin mukaan valo osui Hunterin kasvoihin ja se on epäluuloinen ja tulossa tutkimaan.",
          "caption": "Pelikuva ja AI-debug-teksti / Taskulampun valo osui Hunterin kasvoihin: se muuttuu epäluuloiseksi ja lähtee tutkimaan."
        },
        "chase": {
          "title": "Takaa-ajo",
          "description": "Debug-teksti näyttää varmistuneen havainnon ja Chase-tilan.",
          "alt": "Liikkeestä sumea Hunter juoksee kirkkaassa, taskulampun valaisemassa sairaalakäytävässä. Debug-teksti kertoo havainnosta ja Chase-tilasta.",
          "caption": "Pelikuva ja AI-debug-teksti / Havainto on varmistunut, ja Hunter on Chase-tilassa."
        }
      }
    },
    storycodex: {
      category: 'Android / Tekoälytarinat', description: 'Pieni käyttöliittymä suurelle mielikuvitukselle.',
      summary: 'Android-tarinasovellus, jossa lapset valitsevat hahmot, paikan ja juonen. Kielimalli luo suomenkielisen tarinan, Androidin puhesynteesi lukee sen ääneen ja välimuistiin tallennetut tarinat ovat käytettävissä ilman verkkoyhteyttä.',
      role: null, status: 'Portfolioprojekti',
      highlights: ['Tarinoiden luonti painikkeilla', 'Suomenkielinen luonti ja kerronta', 'Tallennettujen tarinoiden käyttö ilman verkkoa'],
      architecture: 'Jetpack Compose -Android-sovellus, taustarajapinta ja kielimalli-integraatio sekä Androidin puhesynteesi ja tarinoiden välimuisti.',
      challenges: ['Lapsille suunnattu turvallisuuspainotteinen käyttöliittymä ja hallitut kehotteet.'], verification: [],
      linkLabels: { demo: 'Avaa demo', github: 'Lähdekoodi', caseStudy: 'Projektin esittely' }, mediaText: null,
      study: [
        { title: 'Helposti lähestyttävä tarinanluonti', paragraphs: ['Lapset valitsevat hahmot, paikan ja juonen painikkeilla. Sovellus lähettää hallitun kehotteen taustarajapintansa kautta ja tuottaa lapsille suunnatun suomenkielisen tarinan. Androidin puhesynteesi lukee tarinan ääneen.'] },
        { title: 'Hyödyllinen ilman verkkoyhteyttä', paragraphs: ['Verkoton käyttö perustuu aiemmin välimuistiin tallennettuihin tarinoihin. Se ei tarkoita paikallista kielimallin käyttöä. Alkuperäinen portfolio kertoo Kotlinista, Jetpack Composesta, Androidin puhesynteesistä, OpenAI-kielimallirajapinnasta ja taustarajapinnasta.'] },
        { title: 'Suunnittelun lähtökohdat', paragraphs: ['Nykyinen projektikuvaus korostaa turvallisuuspainotteista sovellussuunnittelua ja hallittuja kehotteita. Muodollisen lapsiturvallisuusarvioinnin tuloksia tai julkaisulinkkejä ei ole toimitettu, joten turvallisuuden varmennusta ei väitetä tehdyksi.'] },
      ],
    },
    'author-website': {
      category: 'Full-stack / Palvelimeton verkkosovellus', description: 'Kirjailijasivusto ja sen ylläpidon työkalut.',
      summary: 'Kaksikielinen kirjailijasivusto, jossa on kirjojen hallinta, JWT-pohjainen ylläpitäjän kirjautuminen ja yhteydenottorajapinta. Staattiset sivut yhdistyvät Node.js-taustajärjestelmään, ja paikallinen kehitys käyttää Express-palvelinta.',
      role: 'Sivuston ja backendin suunnittelu ja toteutus', status: 'Nykyinen verkkosivusto',
      highlights: ['Kaksikielinen staattinen käyttöliittymä', 'Kirjojen hallinta kirjautumisen takana', 'Paikallinen Express ja palvelimettomat rajapinnat'],
      architecture: 'HTML-, CSS- ja JavaScript-käyttöliittymä, palvelimettomat Node.js-rajapinnat, JWT-pohjainen ylläpitäjän kirjautuminen ja JSON-kirjatallennus. Express toteuttaa samat rajapinnat paikallisesti.',
      challenges: ['Pidä paikallinen kehitys ja palvelimeton toiminta yhdenmukaisina.', 'Erota julkiset kirjatiedot kirjautumista edellyttävästä hallinnasta.'], verification: [],
      linkLabels: { demo: 'Katso sivusto', github: 'Lähdekoodi', caseStudy: 'Projektin esittely' }, mediaText: null,
      study: [
        { title: 'Julkinen sivusto ja ylläpidon työnkulku', paragraphs: ['Kirjailijasivusto tarjoaa staattisia kaksikielisiä sivuja ja kirjatietoja. Ylläpitäjän käyttöliittymä tunnistautuu JWT:llä ja tukee kirjojen luontia, lukemista, muokkausta ja poistamista Node.js-rajapintojen kautta. Yhteydenottorajapinta välittää viestit määritetyn sähköpostipalvelun kautta.'] },
        { title: 'Kaksi ympäristöä, yksi työnkulku', paragraphs: ['Vercelin palvelimettomat rajapinnat palvelevat julkista sivustoa. Express-kehityspalvelin toteuttaa kirjojen ja yhteydenottojen rajapinnat paikallisesti. Kirjatiedot tallennetaan JSON-tiedostoon; projektin dokumentaatio tunnistaa varsinaisen tietokannan tulevaksi vaihtoehdoksi rinnakkaisiin tuotantokirjoituksiin.'] },
        { title: 'Säilytetty portfolion rinnalla', paragraphs: ['Portfolion uudistus säilyttää kirjailijasivut, rajapintakäsittelijät, kirjatiedot ja ylläpitäjän käyttöliittymän. TypeScript-pohjainen sisällöntuotanto luo staattisen portfolion ilman uutta sovelluskehystä tai muutoksia julkaisupalvelun asetuksiin.'] },
      ],
    },
  },
};
