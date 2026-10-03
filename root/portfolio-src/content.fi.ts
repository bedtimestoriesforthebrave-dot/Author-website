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
      placeholders: ['Selostettu esittelyvideo voidaan lisätä.'],
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
      "category": "Tarinavetoinen ensimmäisen persoonan narratiivinen peli",
      "description": "Itsenäisesti johdettu Unreal Engine 5 / C++ -peliprojekti, jossa tarina, systeeminen gameplay ja tunnelma kohtaavat.",
      "summary": "Kehittyvän tarinan ja loren ympärille rakentuva projekti yhdistää ensimmäisen persoonan tutkimisen, stealthin, vihollis-AI:n, ympäristöinteraktiot, level designin, hahmoprototypoinnin ja alkuperäisen musiikin. Nykyinen pelattava osuus kehittää gameplay- ja teknisiä järjestelmiä, jotka tukevat tätä laajempaa tarinavetoista kokemusta.",
      "role": "Itsenäisesti johdettu, AI-avusteisesti kehitetty projekti, jossa käytetään lisensoituja ympäristöassetteja.",
      "status": "Kehitteillä · pelattava stealth- ja AI-prototyyppi",
      "highlights": [
        "Tarina & maailmanrakennus",
        "Gameplay- ja vihollisjärjestelmät",
        "Level design & alkuperäinen musiikki"
      ],
      "architecture": "Unreal Engine 5 / C++ yhdistää pelaajan liikkumisen ja interaktiot, systeemisen vihollis-AI:n, ympäristösuunnittelun ja reagoivan äänen.",
      "challenges": [
        "Pidä havainnointi ja takaa-ajo johdonmukaisina ilman piilossa olevan pelaajan sijainnin seurantaa.",
        "Sovita navigointi, ovitoiminnot ja kuulo pelattavan alueen rajoihin.",
        "Erota toistettavat toimintapäätökset reaaliaikaisesta säädöstä ja esitystavasta."
      ],
      "verification": [
        "Tallennettuihin kehitysajoihin sisältyy 12/12 läpäistyä skriptattua AI-regressiotestiä 17.9.2026. Tulos on projektin aiempaa näyttöä; Unreal-testejä ei ajettu uudelleen tämän portfoliopäivityksen aikana.",
        "Skriptatut PIE-tarkistukset käsittelevät havainnointia, takaa-ajoa, muistia ja kiinniottoa. Konsolikomennot, päälle piirretyt tilatiedot ja maailmaan sijoitetut merkit tukevat kohdennettua pelitestausta ja virheenjäljitystä."
      ],
      "placeholders": [
        "Aitoja peli- ja debug-kuvia suunnitellaan; konseptikuva ei ole pelikuva.",
        "Julkista peliversio- tai lähdekoodilinkkiä ei ole toimitettu."
      ],
      "linkLabels": {
        "demo": "Avaa demo",
        "github": "Lähdekoodi",
        "caseStudy": "Tutustu projektiin"
      },
      "mediaText": null,
      "study": [
        {
          "title": "Tarina ja maailmanrakennus",
          "paragraphs": [
            "A Chain of Pain on kehitteillä oleva tarinavetoinen ensimmäisen persoonan narratiivinen peli, jonka suunnittelu rakentuu laajemman tarinan ja kehittyvän loren ympärille. Maailman historiaa, ympäristön kautta kerrottavaa tarinaa, kohtaamisia ja pelin rakennetta suunnitellaan tukemaan tarinaa myös ilman suoraa dialogia.",
            "Nykyinen pelattava osuus keskittyy gameplay- ja teknisiin järjestelmiin, joiden päälle narratiivinen kokemus rakentuu. Dialogia, pelaajan valintoja, tavoitteita, tarinatapahtumien laukaisimia, haarautuvia loppuja tai täyttä narratiivista etenemistä ei ole vielä toteutettu. Pelisuunnittelu, ohjelmistokehitys, kentän koostaminen, hahmokehitys ja alkuperäinen musiikki kuuluvat samaan itsenäisesti johdettuun projektiin."
          ]
        },
        {
          "title": "Gameplay-järjestelmät ja pelattava osuus",
          "paragraphs": [
            "Ensimmäisen persoonan tutkiminen ja stealth-painotteinen liikkuminen muodostavat nykyisen pelisilmukan sairaalaympäristössä. Hiipiminen, kyykistyminen, juoksu ja rajallinen panic sprint tarjoavat eri tapoja liikkua kohtaamistilanteissa ja paeta.",
            "Uudelleenkäytettävä katseeseen perustuva interaktiojärjestelmä yhdistää pelaajan ympäristöön. Siihen kuuluu pelaajan ja vihollisen yhteinen ovijärjestelmä. Taskulamppu tukee tutkimista ja vaikuttaa samalla vihollisen havainnointiin. Liikkumisen ja ovien äänet ovat osa samaa pelisilmukkaa.",
            "Haavat paranevat vaiheittain, ja mukana on kriittinen tila. Kiinniotto ja kuolema johtavat uuteen yritykseen. Nämä pelaajan järjestelmät muodostavat laajemman pelin pelattavan perustan; Hunter on yksi sen keskeisistä järjestelmistä."
          ]
        },
        {
          "title": "Ympäristö ja level design",
          "paragraphs": [
            "Laaja ympäristö yhdistää kartanon ja kaksi sairaalarakennusta yhteen One File Per Actor -karttaan. Koostan tilat, kulkureitit ja kohtaamisalueet lisensoiduista kolmansien osapuolten modulaarisista ympäristöasseteista; alkuperäiset assetit eivät ole omaa mallinnustyötäni. Maailman historia ja ympäristön kautta kerrottava tarina ohjaavat tilojen suunnittelua. H2-sairaala yhdistää tällä hetkellä monikerroksisen NavMeshin, AI:n toiminta-alueen, esteet, lukitut reitit ja yhteiseen interaktiojärjestelmään sovitetut ovet.",
            "Yksi skriptattu Door-14-väijytys ohjaa Hunteria hetkellisesti tavallisen StateTree-toiminnan ulkopuolella ja palauttaa sitten ohjauksen systeemiseen takaa-ajoon. Ympäröivä maailma on tätä testattua osuutta laajempi: monikerroksisesta navigoinnista on näyttöä, mutta porrastakaa-ajot tarvitsevat vielä erillistä pelitestausta."
          ]
        },
        {
          "title": "Hahmokehitys",
          "paragraphs": [
            "Hunter 1 -hahmon AI-avusteinen prototypointi ja kehitys. Hahmo on edelleen työn alla, ja sen esitystapaa sekä gameplay-integraatiota kehitetään yhä."
          ]
        },
        {
          "title": "Äänimaailma ja alkuperäinen soundtrack",
          "paragraphs": [
            "Sävelsin pelin alkuperäisen soundtrackin.",
            "Toteutin myös reagoivia äänijärjestelmiä, jotka mukautuvat vihollisen tilaan ja gameplayhin. Musiikki vaihtuu tutkimisen, vaaran, takaa-ajon ja kuoleman välillä. Pinnan ja liikkumistavan huomioivat askeleet sekä ovien äänet yhdistävät pelaajan toiminnan vihollisen kuuloon."
          ]
        },
        {
          "title": "Systeeminen vihollis-AI",
          "paragraphs": [
            "H1 Hunter on oma C++-vihollinen, joka käyttää Unrealin AI Perceptionia ja StateTreetä. Ohjain vastaa päätöksenteosta ja hahmo liikkumisesta sekä fyysisistä toiminnoista. Erillinen tietokomponentti käsittelee havainnot, tunnistuksen, muistin ja etsintätiedot. Toimintatehtävät lukevat tätä komponenttia piilossa olevan pelaajan reaaliaikaisen tilan sijaan.",
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
            "Taskulamppu helpottaa näkemistä, mutta lisää paljastumisen riskiä: se vaikuttaa näkökantamaan ja tunnistukseen, ja näkyvä valokeila tai valaistu kohta voi muodostaa vihjeen. Debug-näkymä näyttää näön osatekijät, jotta toimintaa voi tarkastaa ja säätää."
          ]
        },
        {
          "title": "Muisti ilman seinien läpi näkemistä",
          "paragraphs": [
            "Vihollinen etsii viimeksi havaitsemansa tiedon perusteella sen sijaan, että seuraisi piilossa olevan pelaajan reaaliaikaista sijaintia. Kun näköyhteys katkeaa, viimeinen varmennettu sijainti ja liikesuunta säilyvät. Tuore ääni voi ylläpitää takaa-ajoa tai korvata vanhemman etsintätiedon. Kohteen menettäminen käynnistää etsinnän viimeksi havaitusta paikasta.",
            "Etsinnän alku painottuu pelaajan viimeaikaiseen kulkusuuntaan. Etsintäsäde laajenee, käytyjä paikkoja vältetään ja ehdotettujen reittien on pysyttävä alueen sisällä. Etsinnän jälkeen AlertRoam partioi katoamisalueella, kunnes valppaus laskee."
          ]
        },
        {
          "title": "Toiminta valitaan prioriteetin mukaan",
          "paragraphs": [
            "StateTree valitsee ensimmäisen kelvollisen tilan tässä prioriteettijärjestyksessä. Valinta tehdään uudelleen tiedon muuttuessa tai tehtävän päättyessä. Tilat kilpailevat valinnasta; ne eivät ole peräkkäisiä pelivaiheita. Kiinniotolla ja tainnutuksella on myös tapahtumapohjaiset ohitukset. Valppaustaso on erillinen tietokomponentin arvo."
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
                "title": "Stunned",
                "description": "Tainnutus on aktiivinen; toipuminen käynnistää etsinnän.",
                "note": "Tuki vain debug-laukaisulle; pelin sisäistä tainnutuslähdettä ei ole vahvistettu."
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
          "title": "Pelaaja, ympäristö ja Hunter",
          "paragraphs": [
            "AI toimii osana pelattavaa ympäristöä. Uuden kohtaamisen lyhyellä ryntäyksellä on palautumisaika. Kiinniotto edellyttää ulottuvuutta, varmennettua näköyhteyttä ja lyhyttä kuljettavaa reittiä. Alue ja takaa-ajon etäisyysraja rajoittavat toimintaa. Hunter avaa reitillään suljetut lukitsemattomat ovet ja kunnioittaa lukkoja."
          ],
          "visual": {
            "kind": "integration",
            "label": "Toisiinsa kytkeytyvät pelijärjestelmät",
            "caption": "Pelaajan toiminta muuttaa ympäristöä ja havaintotietoa. Hunterin toiminta vaikuttaa takaisin pelaajan paineeseen ja ääniin.",
            "items": [
              {
                "title": "Pelaajan liikkuminen",
                "description": "Hiipiminen, kyykistyminen ja juoksu vaikuttavat näkyvyyteen ja ääneen. Rajallinen paniikkisprintti tukee pakenemista."
              },
              {
                "title": "Interaktiot ja ovet",
                "description": "Uudelleenkäytettävä katseeseen perustuva rajapinta ja yhteinen oviluokka palvelevat pelaajaa, AI:ta ja kohtaamisia."
              },
              {
                "title": "Havaintojen syötteet",
                "description": "Pinnan ja liikkumistavan huomioivat askeleet, ovien äänet ja taskulamppu välittävät tietoa Hunterille."
              },
              {
                "title": "Haavat ja uusi yritys",
                "description": "Haavat paranevat vaiheittain, ja mallissa on kriittinen tila. Kiinniotto ja kuolema johtavat uuteen yritykseen."
              },
              {
                "title": "Reagoiva ääni",
                "description": "Musiikki vaihtuu tutkimisen, vaaran, takaa-ajon ja kuoleman välillä Hunterin tilanteen mukaan."
              }
            ]
          }
        },
        {
          "title": "Tekninen työ ja iterointi",
          "paragraphs": [
            "Vaiheittainen kehitys käyttää Gitiä, Git LFS:ää ja One File Per Actor -rakennetta. Uudelleenkäytettävät komponentit erottavat havainnoinnin, hahmon toiminnot, interaktiot, haavat ja äänen. AI:n säätöarvot ovat pelin aikana luettavassa data-assetissa, joten iterointi ei edellytä vakioiden hajauttamista toimintakoodiin."
          ],
          "bullets": [
            "Konsolin testikomennot, visuaaliset merkit ja tilanäkymät näyttävät tunnistuksen, kuulopäätökset, muistetut sijainnit ja etsinnän kohteet.",
            "Python-työkalut tukevat skriptattuja PIE-regressiotarkistuksia ja vievät kenttägeometrian mittakaavaisiksi pohjapiirroksiksi.",
            "Suunnittelusäännöt, hyväksymiskriteerit ja pienet kehitysvaiheet pitävät toteutuksen ja katselmoinnin rajattuina."
          ]
        },
        {
          "title": "Prototyypit ja seuraavat vaiheet",
          "paragraphs": [
            "Hunterin pienempi naulapyssyprototyyppi käyttää fyysisiä ammuksia, näköyhteyteen sidottua laukaisua, ammusten kiinnittymistä pintoihin ja samanaikaisten ammusten ylärajaa. Tähtäyksen esitys on paikkamerkkitasolla, ja audiovisuaalinen viimeistely on kesken.",
            "Nykyinen pelattava osuus yhdistää pelaajan järjestelmät, systeemisen vihollis-AI:n, ympäristön koostamisen ja reagoivan äänen. Laajempi tarina ja lore ohjaavat projektia, mutta narratiivisen kokonaisuuden toteutus kuuluu tulevaan työhön. Hahmokehitys ja audiovisuaalinen viimeistely jatkuvat gameplayn iteroinnin rinnalla."
          ],
          "note": "Projektista voidaan tarvittaessa esitellä gameplayta, AI-debug-näkymiä ja teknistä toteutusta tarkemmin."
        }
      ],
      "mediaSlots": {
        "hero": {
          "title": "Pelattava sairaalaosuus",
          "description": "Aito pelikuva näyttää sairaalaympäristön koostamisen ja Hunterin samassa tilassa. Nykyinen konseptikuva ei esitä pelitilannetta.",
          "alt": "Ensimmäisen persoonan pelikuva H2-sairaalasta, jossa näkyvät Hunter ja vuorovaikutteinen ovi.",
          "caption": "Pelikuva / H2-sairaala. Ympäristö on koostettu kolmansien osapuolten modulaarisista asseteista."
        },
        "detection": {
          "title": "Näköhavainnon perusteet näkyviin",
          "description": "Suunniteltu debug-kuva näyttää osittain täyttyneen tunnistusmittarin sekä etäisyyden, katselukulman, liikkumistavan ja taskulampun vaikutukset.",
          "alt": "Hunterin debug-näkymä, jossa näkyvät osittain täyttynyt tunnistusmittari ja näön yksittäiset osatekijät.",
          "caption": "PIE-debug-kuva / Asteittainen näköhavainto ja näön osatekijät."
        },
        "hearing": {
          "title": "Ääni kerrosten ja reittien välillä",
          "description": "Suunniteltu debug-kuva vertailee kuulunutta ja vaimentunutta ääntä kuljettavan reitin pituuden ja kuulorajan avulla.",
          "alt": "Hunterin kuulon debug-tiedot, joissa näkyvät äänipäätös, NavMesh-reitin pituus ja viimeksi kuullun sijainnin merkki.",
          "caption": "PIE-debug-kuva / Reitin huomioiva kuulo sairaalaympäristössä."
        },
        "search": {
          "title": "Etsintä muistetun tiedon perusteella",
          "description": "Suunniteltu kuva näyttää viimeisen näköhavainnon merkin, laajenevan etsintäalueen, suuntapainotuksen ja valitun kohteen näköyhteyden katkettua.",
          "alt": "Hunterin etsinnän debug-merkit, joissa näkyvät viimeksi havaittu sijainti, etsintäalue, suunta ja kohde.",
          "caption": "PIE-debug-kuva / Muistiin perustuva, suuntapainotettu etsintä."
        },
        "loop": {
          "title": "Lyhyt stealth-pelisilmukka",
          "description": "Suunniteltu pelivideo yhdistää äänen, tutkimisen, näköhavainnon, takaa-ajon, paon ja etsinnän. Se näyttää toimivan prototyypin eikä lavastettua väitettä ominaisuudesta.",
          "alt": "Pelivideo, jossa pelaaja herättää Hunterin huomion, pakenee takaa-ajoa ja näkee vihollisen etsivän viimeksi havaitulla alueella.",
          "caption": "Pelivideo / Integroitu stealth-pelisilmukka. Ympäristötaide on kolmansien osapuolten tekemää."
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
      placeholders: ['Varmennetut kuvakaappaukset', 'Julkinen lähdekoodi- tai julkaisulinkki', 'Muodollinen arviointi- ja testausnäyttö'],
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
      role: null, status: 'Nykyinen verkkosivusto',
      highlights: ['Kaksikielinen staattinen käyttöliittymä', 'Kirjojen hallinta kirjautumisen takana', 'Paikallinen Express ja palvelimettomat rajapinnat'],
      architecture: 'HTML-, CSS- ja JavaScript-käyttöliittymä, palvelimettomat Node.js-rajapinnat, JWT-pohjainen ylläpitäjän kirjautuminen ja JSON-kirjatallennus. Express toteuttaa samat rajapinnat paikallisesti.',
      challenges: ['Pidä paikallinen kehitys ja palvelimeton toiminta yhdenmukaisina.', 'Erota julkiset kirjatiedot kirjautumista edellyttävästä hallinnasta.'], verification: [],
      placeholders: ['Sovelluksen oma kuvakaappaus'],
      linkLabels: { demo: 'Katso sivusto', github: 'Lähdekoodi', caseStudy: 'Projektin esittely' }, mediaText: null,
      study: [
        { title: 'Julkinen sivusto ja ylläpidon työnkulku', paragraphs: ['Kirjailijasivusto tarjoaa staattisia kaksikielisiä sivuja ja kirjatietoja. Ylläpitäjän käyttöliittymä tunnistautuu JWT:llä ja tukee kirjojen luontia, lukemista, muokkausta ja poistamista Node.js-rajapintojen kautta. Yhteydenottorajapinta välittää viestit määritetyn sähköpostipalvelun kautta.'] },
        { title: 'Kaksi ympäristöä, yksi työnkulku', paragraphs: ['Vercelin palvelimettomat rajapinnat palvelevat julkista sivustoa. Express-kehityspalvelin toteuttaa kirjojen ja yhteydenottojen rajapinnat paikallisesti. Kirjatiedot tallennetaan JSON-tiedostoon; projektin dokumentaatio tunnistaa varsinaisen tietokannan tulevaksi vaihtoehdoksi rinnakkaisiin tuotantokirjoituksiin.'] },
        { title: 'Säilytetty portfolion rinnalla', paragraphs: ['Portfolion uudistus säilyttää kirjailijasivut, rajapintakäsittelijät, kirjatiedot ja ylläpitäjän käyttöliittymän. TypeScript-pohjainen sisällöntuotanto luo staattisen portfolion ilman uutta sovelluskehystä tai muutoksia julkaisupalvelun asetuksiin.'] },
      ],
    },
  },
};
