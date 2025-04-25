import React, { useState, FormEvent } from "react";
import {
  ShieldCheck,
  PawPrint,
  Home,
  Building2,
  Activity,
  Gavel,
  Car,
  Stethoscope,
  PlusSquare,
  Dog,
  UserX,
  Accessibility,
  AlertTriangle,
  Banknote,
  Wallet,
  ClipboardList,
  ClipboardSignature,
  CreditCard,
  Coins,
  Skull,
  Heart,
  HeartPulse,
  Briefcase,
  PiggyBank,
  Users,
  Baby,
  Folder,
  Video,
  X, Search,
} from "lucide-react";

// Einfaches Dialog-Modal (für Vertragsliste)
const Dialog = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!open) return null;
  
  const highlightMatch = (text: string, query: string): JSX.Element | string => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    );
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full shadow-xl relative">
        <div className="flex justify-end mb-4">
          <a
            onClick={onClose}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Schließen
          </a>
        </div>
        {children}
      </div>
    </div>
  );
};

// Einfaches Sheet (Drawer) für detaillierte Produktbeschreibung
const Sheet = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!open) return null;
  
  const highlightMatch = (text: string, query: string): JSX.Element | string => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    );
  };


  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div className="w-full sm:w-96 bg-white p-6 shadow-xl h-full overflow-auto relative">
        <button
          onClick={onClose}
          className="text-blue-600 hover:underline mb-4 absolute top-4 right-4"
        >
          Schließen
        </button>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
};

// Typdefinition für einen Vertrag
type Contract = {
  status: string;
  versicherer: string;
  versicherungsart: string;
  vsnr: string;
  beitrag: string;
  datenaktualisierung: string;
};

// Initiale Vertragsdaten
const initialContracts: Contract[] = [
  {
    status: "optimieren",
    versicherer: "Allianz Versicherungs-AG",
    versicherungsart: "Wohngebäude",
    vsnr: "9876543",
    beitrag: "987,00 €",
    datenaktualisierung: "Ja",
  },
  {
    status: "none",
    versicherer: "VHV Versicherungen",
    versicherungsart: "Rechtsschutz",
    vsnr: "765432",
    beitrag: "333,00 €",
    datenaktualisierung: "Ja",
  },
  {
    status: "none",
    versicherer: "AdmiralDirekt.de",
    versicherungsart: "Kfz-Versicherung",
    vsnr: " - ",
    beitrag: " - ",
    datenaktualisierung: " - ",
  },
  {
    status: "none",
    versicherer: "Gothaer Allgemeine Versicherung AG",
    versicherungsart: "Privathaftpflicht",
    vsnr: " - ",
    beitrag: "64,66 €",
    datenaktualisierung: " Ja ",
  },
  {
    status: "kuendigung",
    versicherer: "Alte Leipziger Lebensversicherung a.G.",
    versicherungsart: "Privathaftpflicht",
    vsnr: "123476",
    beitrag: "100,00 €",
    datenaktualisierung: " - ",
  },
];

// Versicherungsfelder und Produktlisten
const versicherungen = {
  "Alltag": [
    "Privathaftpflicht",
    "Tierhalterhaftpflicht",
    "Hausrat",
    "Wohngebäude",
    "Unfallversicherung",
    "Rechtsschutzversicherung",
    "Kfz-Versicherung",
  ],
  "Gesundheit & Pflege": [
    "Vollversicherung (PKV)",
    "Zusatzversicherung",
    "Pflegeversicherung",
    "Tierkrankenversicherung",
  ],
  "Einkommenssicherung": [
    "Berufsunfähigkeit",
    "Erwerbsunfähigkeit",
    "Grundfähigkeitsversicherung",
    "Dread Disease",
  ],
  "Altersvorsorge": [
    "Basis-Rente",
    "Sofort-Basis-Rente",
    "Riester-Rente",
    "Direktversicherung",
    "Direktversicherung BU",
    "Unterstützungskasse",
    "Private Rente",
    "Sofortrente",
  ],
  "Hinterbliebene": ["Risikolebensversicherung", "Sterbegeldversicherung"],
  "Spezialtarife": ["Kinderspezialtarife"],
};

const beschreibungen: Record<string, string> = {
  "Alltag":
    "Ob im Haushalt, beim Sport oder im Straßenverkehr – alltägliche Risiken können teuer werden.",
  "Gesundheit & Pflege":
    "Deine Gesundheit ist unbezahlbar. Diese Tarife sichern dich medizinisch optimal ab.",
  "Einkommenssicherung":
    "Wenn du plötzlich nicht mehr arbeiten kannst, wird es schnell finanziell eng.",
  "Altersvorsorge":
    "Damit du im Ruhestand deinen Lebensstandard halten kannst.",
  "Hinterbliebene":
    "Sicherheit für deine Familie im Ernstfall – die richtige Absicherung im Todesfall.",
  "Spezialtarife":
    "Spezielle Lösungen, oft maßgeschneidert für individuelle Lebenssituationen.",
};


const productIcons: Record<string, JSX.Element> = {
  "Privathaftpflicht": <ShieldCheck className="w-4 h-4 text-gray-600" />,
  "Tierhalterhaftpflicht": <PawPrint className="w-4 h-4 text-gray-600" />,
  "Hausrat": <Home className="w-4 h-4 text-gray-600" />,
  "Wohngebäude": <Building2 className="w-4 h-4 text-gray-600" />,
  "Unfallversicherung": <Activity className="w-4 h-4 text-gray-600" />,
  "Rechtsschutzversicherung": <Gavel className="w-4 h-4 text-gray-600" />,
  "Kfz-Versicherung": <Car className="w-4 h-4 text-gray-600" />,
  "Vollversicherung (PKV)": <Stethoscope className="w-4 h-4 text-gray-600" />,
  "Zusatzversicherung": <PlusSquare className="w-4 h-4 text-gray-600" />,
  "Pflegeversicherung": <HeartPulse className="w-4 h-4 text-gray-600" />,
  "Tierkrankenversicherung": <Dog className="w-4 h-4 text-gray-600" />,
  "Berufsunfähigkeit": <Briefcase className="w-4 h-4 text-gray-600" />,
  "Erwerbsunfähigkeit": <UserX className="w-4 h-4 text-gray-600" />,
  "Grundfähigkeitsversicherung": <Accessibility className="w-4 h-4 text-gray-600" />,
  "Dread Disease": <AlertTriangle className="w-4 h-4 text-gray-600" />,
  "Basis-Rente": <Banknote className="w-4 h-4 text-gray-600" />,
  "Sofort-Basis-Rente": <Wallet className="w-4 h-4 text-gray-600" />,
  "Riester-Rente": <PiggyBank className="w-4 h-4 text-gray-600" />,
  "Direktversicherung": <ClipboardList className="w-4 h-4 text-gray-600" />,
  "Direktversicherung BU": <ClipboardSignature className="w-4 h-4 text-gray-600" />,
  "Unterstützungskasse": <CreditCard className="w-4 h-4 text-gray-600" />,
  "Private Rente": <Coins className="w-4 h-4 text-gray-600" />,
  "Sofortrente": <Coins className="w-4 h-4 text-gray-600" />,
  "Risikolebensversicherung": <Heart className="w-4 h-4 text-gray-600" />,
  "Sterbegeldversicherung": <Skull className="w-4 h-4 text-gray-600" />,
  "Kinderspezialtarife": <Baby className="w-4 h-4 text-gray-600" />,
};


const icons: Record<string, JSX.Element> = {
  "Alltag": <ShieldCheck className="w-5 h-5 text-red-500" />,
  "Gesundheit & Pflege": <HeartPulse className="w-5 h-5 text-red-500" />,
  "Einkommenssicherung": <Briefcase className="w-5 h-5 text-red-500" />,
  "Altersvorsorge": <PiggyBank className="w-5 h-5 text-red-500" />,
  "Hinterbliebene": <Users className="w-5 h-5 text-red-500" />,
  "Spezialtarife": <Baby className="w-5 h-5 text-red-500" />,
};

// Ausführliche Erklärtexte für den Drawer (Sheet)
const tooltipTexte: Record<string, string> = {
  "Privathaftpflicht": `
Die Privathaftpflichtversicherung übernimmt Kosten, wenn du unbeabsichtigt Dritten Schaden zufügst – sei es an Personen oder deren Eigentum.
Diese Police ist essenziell, da schon kleine Unachtsamkeiten zu hohen Schadensersatzforderungen führen können.
  `,
  "Tierhalterhaftpflicht": `
Diese Versicherung schützt dich, wenn dein Haustier Schäden verursacht. Insbesondere bei Hunden, Pferden oder anderen Tieren,
die in der Öffentlichkeit auftreten, ist diese Absicherung unverzichtbar.
  `,
  "Hausrat": `
Die Hausratversicherung sichert dein gesamtes Hab und Gut in der Wohnung gegen Risiken wie Feuer, Einbruch, Leitungswasserschäden und Sturm ab.
Sie deckt in der Regel den Neuwert deines Inventars und mindert im Schadensfall hohe finanzielle Belastungen.
  `,
  "Wohngebäude": `
Die Wohngebäudeversicherung deckt Schäden an deinem Haus ab – etwa durch Feuer, Sturm, Hagel oder Leitungswasser.
Sie schützt den Wiederaufbauwert deines Hauses und verhindert existenzbedrohend hohe Reparaturkosten.
  `,
  "Unfallversicherung": `
Eine private Unfallversicherung leistet, wenn du durch einen Unfall bleibende körperliche Beeinträchtigungen erleidest.
Typische Leistungen sind Invaliditätszahlungen, Unfallrente oder Tagegeld.
  `,
  "Rechtsschutzversicherung": `
Die Rechtsschutzversicherung übernimmt Kosten für Anwälte, Gerichte und Gutachten, wenn du in rechtliche Auseinandersetzungen gerätst.
Je nach Tarif sind verschiedene Bereiche wie Privat-, Berufs- oder Verkehrsrechtsschutz abgedeckt.
  `,
  "Kfz-Versicherung": `
Die Kfz-Versicherung ist in Deutschland Pflicht und deckt Schäden ab, die du mit deinem Fahrzeug verursachst.
Zusätzliche Teil- oder Vollkasko kann auch eigene Schäden abdecken, z. B. bei Diebstahl oder Unfällen.
  `,
  "Vollversicherung (PKV)": `
Die private Krankenversicherung (PKV) bietet umfangreiche Leistungen in ambulanten, stationären und zahnärztlichen Bereichen.
Sie richtet sich vor allem an Selbstständige und Gutverdiener, die einen höheren Leistungsumfang wünschen.
  `,
  "Zusatzversicherung": `
Zusatzversicherungen ergänzen die gesetzliche Krankenversicherung, indem sie Leistungen wie Zahnersatz, Sehhilfen oder alternative Heilmethoden abdecken.
So schließt du Leistungslücken und verhinderst hohe Zusatzkosten.
  `,
  "Pflegeversicherung": `
Die Pflegeversicherung bietet finanzielle Unterstützung im Pflegefall – sei es für ambulante Pflege oder stationäre Unterbringung.
Sie hilft, die oft hohen Pflegekosten zu decken und entlastet dich und deine Familie.
  `,
  "Tierkrankenversicherung": `
Mit der Tierkrankenversicherung werden tierärztliche Kosten übernommen, etwa für Operationen oder teure Behandlungen.
So bist du gegen unerwartete hohe Kosten bei deinem Haustier abgesichert.
  `,
  "Berufsunfähigkeit": `
Diese Versicherung zahlt eine monatliche Rente, wenn du aufgrund von Krankheit oder Unfall deinen Beruf nicht mehr ausüben kannst.
Sie ist ein essenzieller Schutz, um dein Einkommen auch bei langfristigem Arbeitsausfall zu sichern.
  `,
  "Erwerbsunfähigkeit": `
Erwerbsunfähigkeitsversicherungen greifen, wenn du generell keiner Erwerbstätigkeit mehr nachgehen kannst.
Sie sichern dein Einkommen, wenn du im Alter oder bei schweren Erkrankungen nicht mehr arbeiten kannst.
  `,
  "Grundfähigkeitsversicherung": `
Diese Versicherung leistet, wenn du bestimmte grundlegende Fähigkeiten (wie Sehen, Hören oder Gehen) dauerhaft verlierst.
Sie stellt eine Alternative zur klassischen Berufsunfähigkeitsversicherung dar.
  `,
  "Dread Disease": `
Bei der Dread Disease-Versicherung wird im Falle einer schweren Krankheit (z. B. Krebs, Herzinfarkt) eine einmalige Summe ausgezahlt.
Dies ermöglicht dir, teure Therapien zu finanzieren oder Einkommensausfälle zu kompensieren.
  `,
  "Basis-Rente": `
Die Basis-Rente (Rürup-Rente) ist eine steuerlich geförderte, lebenslange Altersvorsorge, die insbesondere für Selbstständige attraktiv ist.
Die Auszahlung erfolgt als monatliche Rente und kann nicht als Kapital ausgezahlt werden.
  `,
  "Sofort-Basis-Rente": `
Bei der Sofort-Basis-Rente zahlst du einmalig einen größeren Betrag ein und erhältst ab sofort eine lebenslange Rente.
Diese Variante bietet schnelle Liquidität im Rentenalter und steuerliche Vorteile.
  `,
  "Riester-Rente": `
Die Riester-Rente ist eine staatlich geförderte private Altersvorsorge, die besonders für Arbeitnehmer mit Kindern interessant ist.
Sie bietet Zulagen und Steuervorteile, erfordert jedoch regelmäßige Eigenbeiträge.
  `,
  "Direktversicherung": `
Die Direktversicherung ist eine Form der betrieblichen Altersvorsorge, bei der dein Arbeitgeber einen Teil deines Gehalts umwandelt.
Die Beiträge werden steuer- und sozialversicherungsfrei einbezahlt und später als Rente ausgezahlt.
  `,
  "Direktversicherung BU": `
Diese Variante kombiniert die Direktversicherung mit einer Berufsunfähigkeitsabsicherung.
So profitierst du von steuerlichen Vorteilen und bist zusätzlich bei Berufsunfähigkeit abgesichert.
  `,
  "Unterstützungskasse": `
Die Unterstützungskasse ist eine spezielle Form der betrieblichen Altersvorsorge, die flexible Beiträge und besondere Steuervorteile bietet.
Sie ist oft für Besserverdienende interessant.
  `,
  "Private Rente": `
Mit der privaten Rentenversicherung sicherst du dir eine flexible Altersvorsorge.
Du hast die Wahl zwischen einer lebenslangen Rente und einer Kapitalauszahlung – häufig kombiniert mit dynamischen Beiträgen.
  `,
  "Sofortrente": `
Die Sofortrente ermöglicht dir durch eine Einmalzahlung sofort monatliche Rentenzahlungen.
Sie ist besonders für Personen attraktiv, die im Alter direkt über ein regelmäßiges Einkommen verfügen möchten.
  `,
  "Risikolebensversicherung": `
Die Risikolebensversicherung sichert deine Familie finanziell ab, falls dir etwas zustößt.
Im Todesfall wird eine vertraglich festgelegte Summe ausgezahlt, um Kredite zu tilgen oder den Lebensunterhalt zu sichern.
  `,
  "Sterbegeldversicherung": `
Diese Versicherung übernimmt die Bestattungskosten und entlastet deine Angehörigen im Todesfall.
Die Versicherungssumme ist meist geringer als bei einer Risikolebensversicherung, dafür oft ohne Gesundheitsprüfung erhältlich.
  `,
  "Kinderspezialtarife": `
Kinderspezialtarife bieten eine frühzeitige Absicherung speziell für Kinder.
Sie ermöglichen oft einen günstigen Einstieg und können später in umfassendere Policen umgewandelt werden.
  `,
};

// Wichtige Leistungskriterien für jede Versicherungsart
const kriterien: Record<string, string[]> = {
  "Privathaftpflicht": [
    "Deckungssumme (z. B. 10 Mio. €)",
    "Selbstbeteiligung",
    "Mietsachschäden",
    "Gefälligkeitsschäden",
  ],
  "Tierhalterhaftpflicht": [
    "Deckung für fremde Personen/Tiere",
    "Mitversicherung von Hundeschulen",
    "Spezialrisiken (z. B. Pferde)",
    "Forderungsausfall",
  ],
  "Hausrat": [
    "Versicherungssumme",
    "Elementarschäden",
    "Fahrraddiebstahl",
    "Wertsachenregelung",
  ],
  "Wohngebäude": [
    "Neuwertversicherung",
    "Elementarschäden",
    "Ableitungsrohre",
    "Photovoltaikanlagen",
  ],
  "Unfallversicherung": [
    "Invaliditätsleistung",
    "Progression",
    "Todesfallsumme",
    "Kosmetische Operationen",
  ],
  "Rechtsschutzversicherung": [
    "Versicherte Lebensbereiche (z. B. Privat, Beruf)",
    "Wartezeiten",
    "Selbstbeteiligung",
    "Mediation",
  ],
  "Kfz-Versicherung": [
    "Haftpflichtdeckungssumme",
    "Kasko (Teil-/Vollkasko)",
    "Rabattschutz",
    "Neupreis-/Kaufpreisentschädigung",
  ],
  "Vollversicherung (PKV)": [
    "Leistungsumfang (ambulant, stationär, Zahn)",
    "Selbstbehalt",
    "Beitragsentwicklung",
    "Optionsrecht zurück in GKV",
  ],
  "Zusatzversicherung": [
    "Leistungsbereiche (z. B. Zahn, Brille)",
    "Erstattungshöhe",
    "Wartezeiten",
    "Freie Arztwahl",
  ],
  "Pflegeversicherung": [
    "Pflegetagegeld vs. Pflegekosten",
    "Leistung nach Pflegegrad",
    "Karenzzeit",
    "Dynamik",
  ],
  "Tierkrankenversicherung": [
    "Operationskosten",
    "Jährliches Limit",
    "Selbstbeteiligung",
    "Freie Tierarztwahl",
  ],
  "Berufsunfähigkeit": [
    "Definition der BU",
    "Prognosezeitraum",
    "Verzicht auf abstrakte Verweisung",
    "Nachversicherungsgarantie",
  ],
  "Erwerbsunfähigkeit": [
    "Definition Erwerbsunfähigkeit",
    "Leistung bei voller Erwerbsunfähigkeit",
    "Karenzzeit",
    "Verzicht auf Verweisung",
  ],
  "Grundfähigkeitsversicherung": [
    "Versicherte Fähigkeiten",
    "Leistung bei Verlust",
    "Verzicht auf Gesundheitsprüfung",
    "Nachversicherungsgarantie",
  ],
  "Dread Disease": [
    "Versicherte Krankheiten",
    "Einmalzahlung",
    "Karenzzeit",
    "Verzicht auf Ausschlüsse",
  ],
  "Basis-Rente": [
    "Beitragshöhe",
    "Steuervorteile",
    "Lebenslange Rentenzahlung",
    "Keine Kapitalauszahlung",
  ],
  "Sofort-Basis-Rente": [
    "Einmalzahlung",
    "Sofort beginnende Rente",
    "Steuerliche Behandlung",
    "Hinterbliebenenschutz",
  ],
  "Riester-Rente": [
    "Zulagenberechtigung",
    "Förderquote",
    "Kapitalwahlrecht",
    "Wohn-Riester-Option",
  ],
  "Direktversicherung": [
    "Entgeltumwandlung",
    "Steuerfreiheit Arbeitgeberbeiträge",
    "Verfügbarkeit bei Jobwechsel",
    "Verpfändung",
  ],
  "Direktversicherung BU": [
    "Kombinierter Schutz",
    "Finanzierung durch Arbeitgeber",
    "BU-Leistungsdefinition",
    "Nachversicherung",
  ],
  "Unterstützungskasse": [
    "Beitragszahlung durch Arbeitgeber",
    "Unverfallbarkeit",
    "Keine Beitragspflicht zur Sozialversicherung",
    "Nachgelagerte Besteuerung",
  ],
  "Private Rente": [
    "Flexibler Rentenbeginn",
    "Kapitalwahlrecht",
    "Hinterbliebenenabsicherung",
    "Dynamik",
  ],
  "Sofortrente": [
    "Einmalbetrag",
    "Garantierte Rente",
    "Überschussbeteiligung",
    "Rentengarantiezeit",
  ],
  "Risikolebensversicherung": [
    "Versicherungssumme",
    "Vertragslaufzeit",
    "Gesundheitsprüfung",
    "Nachversicherungsgarantie",
  ],
  "Sterbegeldversicherung": [
    "Versicherungsdauer",
    "Leistungshöhe",
    "Wartezeit",
    "Gesundheitsprüfung",
  ],
  "Kinderspezialtarife": [
    "Unfallleistungen für Kinder",
    "BU-Schutz ab früher Kindheit",
    "Beitragsfreistellung bei Elterntod",
    "Nachversicherungsoption",
  ],
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showContractsModal, setShowContractsModal] = useState(false);
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);

  // Zustände für das Formular zum Hinzufügen eines neuen Vertrags
  const [newVersicherer, setNewVersicherer] = useState("");
  const [newVersicherungsart, setNewVersicherungsart] = useState("");
  const [newVsnr, setNewVsnr] = useState("");
  const [newBeitrag, setNewBeitrag] = useState("");
  const [newDatenaktualisierung, setNewDatenaktualisierung] = useState("");

  const filteredFields = Object.entries(versicherungen).filter(([feld, produkte]) => {
    const feldMatch = feld.toLowerCase().includes(searchQuery.toLowerCase());
    const beschreibungMatch = beschreibungen[feld]?.toLowerCase().includes(searchQuery.toLowerCase());
  
    const produktMatch = produkte.some((produkt) => {
      const produktTitelMatch = produkt.toLowerCase().includes(searchQuery.toLowerCase());
      const produktBeschreibungMatch = beschreibungen[produkt]?.toLowerCase().includes(searchQuery.toLowerCase());
      return produktTitelMatch || produktBeschreibungMatch;
    });
  
    return feldMatch || beschreibungMatch || produktMatch;
  });  

const handleAddContract = (e: FormEvent) => {
    e.preventDefault();
    const newContract: Contract = {
      status: "none",
      versicherer: newVersicherer,
      versicherungsart: newVersicherungsart,
      vsnr: newVsnr,
      beitrag: newBeitrag,
      datenaktualisierung: newDatenaktualisierung,
    };
    setContracts([...contracts, newContract]);
    // Formularfelder zurücksetzen
    setNewVersicherer("");
    setNewVersicherungsart("");
    setNewVsnr("");
    setNewBeitrag("");
    setNewDatenaktualisierung("");
  };

  
  const highlightMatch = (text: string, query: string): JSX.Element | string => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    );
  };


  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
      {/* Versicherungsordner-Kachel */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Meine Versicherungen</h2>
        <button
          onClick={() => setShowContractsModal(true)}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg border border-gray-200 transition text-left w-full"
        >
          <div className="flex items-center gap-3">
            <Folder className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold">Versicherungsordner</h3>
          </div>
        </button>
      </section>

      {/* Großes Modal mit Vertragsliste und Formular */}
      <Dialog open={showContractsModal} onClose={() => setShowContractsModal(false)}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Bestehende Verträge</h3>
        </div>
        <table className="table-auto w-full border-collapse text-sm mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left w-32"></th>
              <th className="p-2 text-left">Versicherer</th>
              <th className="p-2 text-left">Versicherungsart</th>
              <th className="p-2 text-left">VSNR</th>
              <th className="p-2 text-left">Beitrag (Jahr)</th>
              <th className="p-2 text-left">Datenaktualisierung</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((row, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-2">
                  {row.status === "optimieren" && (
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                      Optimieren
                    </span>
                  )}
                  {row.status === "kuendigung" && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      Kündigung beantragt
                    </span>
                  )}
                </td>
                <td className="p-2">{row.versicherer}</td>
                <td className="p-2">{row.versicherungsart}</td>
                <td className="p-2">{row.vsnr}</td>
                <td className="p-2">{row.beitrag}</td>
                <td className="p-2">{row.datenaktualisierung}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Formular zum Hinzufügen eines neuen Vertrags */}
        <div className="border-t pt-4">
          <h4 className="text-lg font-semibold mb-4">Neuen Vertrag hinzufügen</h4>
          <form onSubmit={handleAddContract} className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Versicherer"
              value={newVersicherer}
              onChange={(e) => setNewVersicherer(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <input
              type="text"
              placeholder="Versicherungsart"
              value={newVersicherungsart}
              onChange={(e) => setNewVersicherungsart(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <input
              type="text"
              placeholder="VSNR"
              value={newVsnr}
              onChange={(e) => setNewVsnr(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="text"
              placeholder="Beitrag (Jahr)"
              value={newBeitrag}
              onChange={(e) => setNewBeitrag(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="text"
              placeholder="Datenaktualisierung"
              value={newDatenaktualisierung}
              onChange={(e) => setNewDatenaktualisierung(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Vertrag hinzufügen
            </button>
          </form>
        </div>
      </Dialog>

   {/* Suche und Kacheln "Neue Versicherungen finden" */}
<section>
  <h2 className="text-xl font-semibold mb-4">Jetzt neue Versicherungen finden</h2>

  <div className="relative mb-6">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    <input
      type="text"
      placeholder="Suche nach Versicherung oder Thema..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300"
    />
    {searchQuery && (
      <button
        onClick={() => setSearchQuery("")}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        aria-label="Suchfeld leeren"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {filteredFields.length === 0 && (
      <div className="text-gray-500 italic">Keine passenden Kategorien oder Produkte gefunden.</div>
    )}
    {filteredFields.map(([feld]) => (
      <button
        key={feld}
        onClick={() => setSelectedField(feld)}
        className="text-left bg-white rounded-2xl shadow-md p-6 space-y-2 border border-gray-200 hover:border-gray-400 hover:shadow-lg transition w-full"
      >
        <div className="flex items-center gap-2 font-medium">
          {icons[feld]}
          {feld}
        </div>
        <div className="text-sm text-gray-600">
          {highlightMatch(beschreibungen[feld], searchQuery)}
        </div>
      </button>
    ))}
  </div>
</section>

      {/* Dialog-Modal für ausgewähltes Versicherungsfeld */}
      <Dialog open={!!selectedField} onClose={() => setSelectedField(null)}>
        <h3 className="text-lg font-semibold mb-4">{selectedField}</h3>
        <div className="grid gap-3">
          {selectedField &&
            versicherungen[selectedField].map((produkt) => (
              <button
                key={produkt}
                onClick={() => setSelectedProduct(produkt)}
                className="bg-gray-50 p-3 rounded-xl text-left hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-2 font-medium">{productIcons[produkt]} {highlightMatch(produkt, searchQuery)}</div>
                <div className="text-sm text-gray-600">
                  {tooltipTexte[produkt].split("\n")[1] || tooltipTexte[produkt]}
                </div>
              </button>
            ))}
        </div>
      </Dialog>

      {/* Drawer (Sheet) für detaillierte Produktbeschreibung */}
      <Sheet open={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <div className="space-y-4 text-sm text-gray-700">
            <h4 className="text-xl font-semibold">{selectedProduct}</h4>
            <p className="whitespace-pre-wrap leading-relaxed">
              {tooltipTexte[selectedProduct]}
            </p>
            <div className="mt-4">
              <strong>Wichtige Leistungskriterien:</strong>
              {kriterien[selectedProduct] ? (
                <ul className="list-disc ml-5 mt-1">
                  {kriterien[selectedProduct].map((punkt, index) => (
                    <li key={index} className="text-sm">
                      {punkt}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm">Keine weiteren Kriterien verfügbar.</div>
              )}
            </div>
            <div className="text-sm">
              <strong>Vergleich:</strong>{" "}
              <a
                href="/vergleichsrechner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Zum Vergleichsrechner
              </a>
            </div>
          </div>
        )}
      </Sheet>

      {/* Anleitungen (Videoanleitungen) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Anleitungen</h2>
        <button
          onClick={() =>
            window.open(
              "https://www.youtube.com/playlist?list=PLdqEaCkhdFEOk89VjuysfqmrHehs59QZb",
              "_blank"
            )
          }
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg border border-gray-200 transition text-left w-full"
        >
          <div className="flex items-center gap-4">
            <Video className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="font-semibold">Videoanleitungen</h3>
              <p className="text-sm text-gray-600">
                Die wichtigsten Features in kurzen Videos erklärt.
              </p>
            </div>
          </div>
        </button>
      </section>
    </div>
  );
}
