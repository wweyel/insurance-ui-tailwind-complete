import React, { useState, FormEvent, useEffect } from "react";
import Dialog from "./Dialog";
import Sheet from "./Sheet";
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
  X,
  Search,
  HelpCircle, // 👉 DAS MUSS HINZUGEFÜGT WERDEN
  CheckCircle
} from "lucide-react";


// Typdefinition für einen Vertrag
type Contract = {
  id: string; // Neue ID-Eigenschaft
  status: string;
  versicherer: string;
  versicherungsart: string;
  vsnr: string;
  beitrag: string;
  datenaktualisierung: string;
};

// Initiale Vertragsdaten
const savedContracts = localStorage.getItem("contracts");
const initialContracts: Contract[] = savedContracts ? JSON.parse(savedContracts) : [
  {
    id: "1",
    status: "optimieren",
    versicherer: "Allianz Versicherungs-AG",
    versicherungsart: "Wohngebäude",
    vsnr: "9876543",
    beitrag: "987,00 €",
    datenaktualisierung: "Ja",
  },
  {
    id: "2",
    status: "none",
    versicherer: "VHV Versicherungen",
    versicherungsart: "Rechtsschutz",
    vsnr: "765432",
    beitrag: "333,00 €",
    datenaktualisierung: "Ja",
  },
  {
    id: "3",
    status: "none",
    versicherer: "AdmiralDirekt.de",
    versicherungsart: "Kfz-Versicherung",
    vsnr: " - ",
    beitrag: " - ",
    datenaktualisierung: " - ",
  },
  {
    id: "4",
    status: "none",
    versicherer: "Gothaer Allgemeine Versicherung AG",
    versicherungsart: "Privathaftpflicht",
    vsnr: " - ",
    beitrag: "64,66 €",
    datenaktualisierung: " Ja ",
  },
  {
    id: "5",
    status: "kuendigung",
    versicherer: "Alte Leipziger Lebensversicherung a.G.",
    versicherungsart: "Privathaftpflicht",
    vsnr: "123476",
    beitrag: "100,00 €",
    datenaktualisierung: " - ",
  },
];

// Vertragsbearbeitung starten
const handleEdit = (contract: Contract) => {
  setEditingContract({ ...contract }); // Vertrag wird zur Bearbeitung gesetzt
};

// Vertragsbearbeitung speichern
const handleSaveEdit = (e: FormEvent) => {
  e.preventDefault();
  if (editingContract) {
      const updatedContracts = contracts.map(contract => 
          contract.id === editingContract.id ? editingContract : contract
      );
      setContracts(updatedContracts);
      localStorage.setItem("contracts", JSON.stringify(updatedContracts)); // Speichern in localStorage
      setEditingContract(null); // Bearbeitungsmodus beenden
  }
};

// Vertrag löschen
const handleDelete = (id: string) => {
  const updatedContracts = contracts.filter(contract => contract.id !== id);
  setContracts(updatedContracts);
  localStorage.setItem("contracts", JSON.stringify(updatedContracts)); // Speichern in localStorage
};

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


// 🔥 Vergleichsbild-Modal-Komponente (Vollformatig)
const ComparisonImageModal = ({
open,
onClose,
imageUrl
}: {
open: boolean;
onClose: () => void;
imageUrl: string;
}) => {
if (!open) return null;

return (
  <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
    <div className="relative w-full h-full flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-50"
      >
        ❌
      </button>
      <img src={imageUrl} alt="Vergleichsbild" className="w-full h-full object-contain" />
    </div>
  </div>
);
};

export default function App() {
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({}); // 🟢 Wichtig: Aktiviert!
  const [showResults, setShowResults] = useState(false);
  const [searchQuery] = useState("");

  const [showComparisonImageModal, setShowComparisonImageModal] = useState(false);
  const [comparisonImage, setComparisonImage] = useState<string>("");

  const handleOpenComparisonModal = (product: string) => {
    let imageUrl = "";
  
    switch (product) {
      case "Privathaftpflicht":
        imageUrl = "/PHV.png";
        break;
      case "Wohngebäude":
        imageUrl = "/Wohngebaeude.png";
        break;
      case "Unfallversicherung":
        imageUrl = "/Unfall.png";
        break;
      case "Kfz-Versicherung":
        imageUrl = "/Kfz.png";
        break;
      default:
        imageUrl = "";
        break;
    }
  
    if (imageUrl) {
      setComparisonImage(imageUrl);
      setShowComparisonImageModal(true);
    }
  };

  return (
    <>
      {/* Großes Modal mit Vertragsliste und Formular */}
      <Dialog open={showContractsModal} onClose={() => setShowContractsModal(false)}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Bestehende Verträge</h3>
        </div>
        <table className="table-auto w-full border-collapse text-sm mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th>Status</th>
              <th>Versicherer</th>
              <th>Versicherungsart</th>
              <th>VSNR</th>
              <th>Beitrag</th>
              <th>Datenaktualisierung</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, index) => (
              <tr key={contract.id || index} className="border-b">
                <td>{contract.status === "none" ? "" : contract.status}</td>
                <td>{contract.versicherer}</td>
                <td>{contract.versicherungsart}</td>
                <td>{contract.vsnr || "-"}</td>
                <td>{contract.beitrag || "-"}</td>
                <td>{contract.datenaktualisierung || "-"}</td>
                <td>
                  <button onClick={() => handleEdit(contract)}>✏️</button>
                  <button onClick={() => handleDelete(contract.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    
        {editingContract && (
          <form onSubmit={handleSaveEdit} className="mb-6 grid gap-4 mt-4">
            <input
              type="text"
              value={editingContract.versicherer}
              onChange={e => setEditingContract({ ...editingContract, versicherer: e.target.value })}
              className="border border-gray-300 p-2 rounded"
              placeholder="Versicherer"
            />
            <input
              type="text"
              value={editingContract.versicherungsart}
              onChange={e => setEditingContract({ ...editingContract, versicherungsart: e.target.value })}
              className="border border-gray-300 p-2 rounded"
              placeholder="Versicherungsart"
            />
            <input
              type="text"
              value={editingContract.vsnr}
              onChange={e => setEditingContract({ ...editingContract, vsnr: e.target.value })}
              className="border border-gray-300 p-2 rounded"
              placeholder="VSNR"
            />
            <input
              type="text"
              value={editingContract.beitrag}
              onChange={e => setEditingContract({ ...editingContract, beitrag: e.target.value })}
              className="border border-gray-300 p-2 rounded"
              placeholder="Beitrag"
            />
            <input
              type="text"
              value={editingContract.datenaktualisierung}
              onChange={e => setEditingContract({ ...editingContract, datenaktualisierung: e.target.value })}
              className="border border-gray-300 p-2 rounded"
              placeholder="Datenaktualisierung"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Speichern</button>
          </form>
        )}
    
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

      {/* Persönlicher Bedarfscheck */}
      

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
          <>
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
                  onClick={() => handleOpenComparisonModal(selectedProduct || "")}
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                  Zum Vergleichsrechner
                </a>
              </div>
            </div>
          </>
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
    <div>
        <section>
            <h2 className="text-xl font-semibold mb-4">Jetzt neue Versicherungen finden</h2>
        </section>
        <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
                type="text"
                placeholder="Suche nach Versicherung oder Thema..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
        <section>
            <h2 className="text-xl font-semibold mb-4">Persönlicher Bedarfscheck</h2>
            <button
                onClick={() => setShowAnalysisModal(true)}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg border border-gray-200 transition text-left w-full"
            >
                <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-red-500" />
                    <h3 className="font-semibold">Bedarfsanalyse starten</h3>
                </div>
            </button>
        </section>
    </div>
    </>
  );
  
{/* Vergleichsrechner Modal */}
{showComparisonModal && (
  <div className="fixed inset-0 bg-black/70 z-[100] flex justify-center items-center">
    <div className="relative w-full max-w-6xl h-full sm:h-[80vh] bg-white rounded-xl shadow-xl overflow-hidden">
      <button
        onClick={() => setShowComparisonModal(false)}
        className="absolute top-4 right-4 text-white text-lg z-50"
      >
        ❌ Schließen
      </button>
      
      <iframe
        src="path/to/your/image/or/comparison.png"
        className="w-full h-full"
        title="Vergleichsrechner"
        style={{ display: "block" }}
      />
    </div>
  </div>
)}

useEffect(() => {
  console.log("showComparisonModal state change:", showComparisonModal);
}, [showComparisonModal]);

  // 🟢 Vertragsbearbeitung starten
const handleEdit = (contract: Contract) => {
  setEditingContract({ ...contract }); // Vertrag wird zur Bearbeitung gesetzt
};

// 🟢 Vertragsbearbeitung speichern
const handleSaveEdit = (e: FormEvent) => {
  e.preventDefault();
  if (editingContract) {
    const updatedContracts = contracts.map(contract =>
      contract.id === editingContract.id ? editingContract : contract
    );
    setContracts(updatedContracts);
    localStorage.setItem("contracts", JSON.stringify(updatedContracts)); // Speichern in localStorage
    setEditingContract(null); // Bearbeitungsmodus beenden
  }
};

// 🟢 Vertrag löschen
const handleDelete = (id: string) => {
  const updatedContracts = contracts.filter(contract => contract.id !== id);
  setContracts(updatedContracts);
  localStorage.setItem("contracts", JSON.stringify(updatedContracts)); // Speichern in localStorage
};

  const questions = [
    "Hast du Kinder oder planst du in nächster Zeit Nachwuchs?",
    "Besitzt du ein eigenes Haus oder eine Eigentumswohnung?",
    "Hast du ein oder mehrere Haustiere?",
    "Bist du selbstständig oder freiberuflich tätig?",
    "Hast du ein eigenes Auto, das du regelmäßig nutzt?",
    "Willst du für das Alter privat vorsorgen?",
    "Möchtest du deine Familie im Todesfall absichern?",
  ];
  
  const gewichtLabels: Record<number, string> = {
    5: "Pflicht",
    4: "sehr wichtig",
    3: "wichtig",
    2: "weniger wichtig",
    1: "bedingt wichtig",
  };

  const recommendations: Record<number, { produkt: string; gewichtung: number }[]> = {
    0: [{ produkt: "Kinderspezialtarife", gewichtung: 4 }],
    1: [
      { produkt: "Wohngebäude", gewichtung: 5 },
      { produkt: "Hausrat", gewichtung: 4 },
    ],
    2: [
      { produkt: "Tierhalterhaftpflicht", gewichtung: 5 },
      { produkt: "Tierkrankenversicherung", gewichtung: 3 },
    ],
    3: [
      { produkt: "Berufsunfähigkeit", gewichtung: 5 },
      { produkt: "Basis-Rente", gewichtung: 3 },
      { produkt: "Private Rente", gewichtung: 2 },
    ],
    4: [{ produkt: "Kfz-Versicherung", gewichtung: 5 }],
    5: [
      { produkt: "Riester-Rente", gewichtung: 4 },
      { produkt: "Private Rente", gewichtung: 3 },
    ],
    6: [
      { produkt: "Risikolebensversicherung", gewichtung: 5 },
      { produkt: "Sterbegeldversicherung", gewichtung: 2 },
    ],
  };
  
  const gewichteteEmpfehlungen: Record<string, number> = {};
  Object.entries(answers).forEach(([frageIndex, antwort]) => {
    if (antwort === "ja") {
      const empfohlene = recommendations[parseInt(frageIndex)];
      empfohlene?.forEach(({ produkt, gewichtung }) => {
        gewichteteEmpfehlungen[produkt] = (gewichteteEmpfehlungen[produkt] || 0) + gewichtung;
      });
    }
  });
  
  const resultProducts = Object.entries(gewichteteEmpfehlungen)
    .sort((a, b) => b[1] - a[1])
    .map(([produkt, gewichtung]) => ({ produkt, gewichtung }));
    
  const recommendedProducts = resultProducts.map(({ produkt }) => produkt);
  
  const circleColors: Record<string, string> = {
    red: "bg-red-500",
    yellow: "bg-yellow-400",
    green: "bg-green-500",
  };
    
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showContractsModal, setShowContractsModal] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const saveRecommendationsToContracts = (newRecommendations: string[]) => {
    const updatedContracts = contracts.map(contract => {
        // Falls ein Vertrag bereits existiert und im empfohlenen Produkt vorkommt, setze den Status auf "empfohlen"
        if (newRecommendations.includes(contract.versicherungsart)) {
            return { ...contract, status: "empfohlen" };
        }
        return contract; // Andernfalls, Vertrag unverändert lassen
    });

    const newContracts = newRecommendations
        .filter(product => !contracts.some(contract => contract.versicherungsart === product))
        .map(product => ({
            status: "empfohlen",
            versicherer: "Empfohlen",
            versicherungsart: product,
            vsnr: "-", // Leeres Feld, wenn keine Daten vorhanden
            beitrag: "-", // Leeres Feld, wenn keine Daten vorhanden
            datenaktualisierung: "-" // Leeres Feld, wenn keine Daten vorhanden
        }));

    setContracts([...updatedContracts, ...newContracts]);
  };


  // Speichere die empfohlenen Produkte im Ordner
  useEffect(() => {
    if (recommendedProducts.length > 0) {
        saveRecommendationsToContracts(recommendedProducts);
    }
  }, [recommendedProducts.length]);  // Nur auf Länge prüfen, nicht auf gesamten Inhalt

  useEffect(() => {
    localStorage.setItem("contracts", JSON.stringify(contracts));
  }, [contracts]);
  
  // Kombiniere empfohlene Produkte mit bestehenden Verträgen
const combinedContracts = recommendedProducts.map(produkt => {
  const existingContract = contracts.find(contract => contract.versicherungsart === produkt);
  if (existingContract) {
      return { ...existingContract, status: "empfohlen" }; // Vertrag aktualisieren und als "empfohlen" markieren
  }
  return { 
      status: "empfohlen", 
      versicherer: "",  // Leer lassen, weil kein Vertrag existiert
      versicherungsart: produkt, 
      vsnr: "-", 
      beitrag: "-", 
      datenaktualisierung: "-" 
  };
});

// Füge bestehende Verträge hinzu, die keine Empfehlungen sind
const nonRecommendedContracts = contracts.filter(contract =>
  !recommendedProducts.includes(contract.versicherungsart)
);

const finalContracts = [...combinedContracts, ...nonRecommendedContracts];


  // Dynamisch generierte Liste aller vorhandenen Versicherungsarten im Ordner
  const existingInsurances = contracts.map(contract => contract.versicherungsart).filter(Boolean);

  // Jetzt kannst du das Set erstellen
  const existingInsurancesSet = new Set(existingInsurances);

  const matchingProducts = recommendedProducts.filter(produkt => existingInsurancesSet.has(produkt));

  // Überprüfen, welche empfohlenen Versicherungen vorhanden sind
  const allProductsPresent = matchingProducts.length === recommendedProducts.length;

  // Ampelstatus basierend auf vorhandenen Versicherungen und Empfehlungen
  const allRecommendedProducts = resultProducts.map(({ produkt }) => produkt);
  const matchedProducts = recommendedProducts.filter(produkt => existingInsurancesSet.has(produkt));

  const statusAmpel = [
    !Object.keys(answers).length && { color: "red", text: "Bedarfscheck fehlt" },
    Object.keys(answers).length > 0 && matchedProducts.length === 0 && { color: "red", text: "Kein empfohlenes Produkt vorhanden" },
    matchedProducts.length > 0 && matchedProducts.length < recommendedProducts.length && { color: "yellow", text: "Teilempfehlungen erfüllt" },
    matchedProducts.length === recommendedProducts.length && { color: "green", text: "Alle Empfehlungen erfüllt" },
  ].filter(Boolean) as { color: string; text: string }[];

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
      id: String(Date.now()), // Generiere eindeutige ID
      status: recommendedProducts.includes(newVersicherungsart) ? "empfohlen" : "none",
      versicherer: newVersicherer,
      versicherungsart: newVersicherungsart,
      vsnr: newVsnr || "-",
      beitrag: newBeitrag || "-",
      datenaktualisierung: newDatenaktualisierung || "-",
    };
    const updatedContracts = [...contracts, newContract];
    setContracts(updatedContracts);
    localStorage.setItem("contracts", JSON.stringify(updatedContracts)); // Speichern im localStorage
  
    // Felder leeren nach dem Hinzufügen
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
  
      {/* Vergleichsbild-Modal */}
      <ComparisonImageModal
        open={showComparisonImageModal}
        onClose={() => setShowComparisonImageModal(false)}
        imageUrl={comparisonImage}
      />
  
      {/* Vergleichsrechner Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex justify-center items-center">
          <div className="relative w-full max-w-6xl h-full sm:h-[80vh] bg-white rounded-xl shadow-xl overflow-hidden">
            <button
              onClick={() => setShowComparisonModal(false)}
              className="absolute top-4 right-4 text-white text-lg z-50"
            >
              ❌ Schließen
            </button>
            <iframe
              src="path/to/your/image/or/comparison.png"
              className="w-full h-full"
              title="Vergleichsrechner"
              style={{ display: "block" }}
            />
          </div>
        </div>
      )}
  
      {/* Dialog-Komponente für Vertragsliste */}
      <Dialog open={showContractsModal} onClose={() => setShowContractsModal(false)}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Bestehende Verträge</h3>
        </div>
        <table className="table-auto w-full border-collapse text-sm mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th>Status</th>
              <th>Versicherer</th>
              <th>Versicherungsart</th>
              <th>VSNR</th>
              <th>Beitrag</th>
              <th>Datenaktualisierung</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, index) => (
              <tr key={contract.id || index} className="border-b">
                <td>{contract.status === "none" ? "" : contract.status}</td>
                <td>{contract.versicherer}</td>
                <td>{contract.versicherungsart}</td>
                <td>{contract.vsnr || "-"}</td>
                <td>{contract.beitrag || "-"}</td>
                <td>{contract.datenaktualisierung || "-"}</td>
                <td>
                  <button onClick={() => handleEdit(contract)}>✏️</button>
                  <button onClick={() => handleDelete(contract.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Dialog>
  
      {/* Dialog für Bedarfsanalyse */}
      <Dialog
        open={showAnalysisModal}
        onClose={() => {
          setShowAnalysisModal(false);
          setAnswers({});
          setShowResults(false);
        }}
      >
        {!showResults ? (
            <div>  {/* <-- Hier ein div einfügen */}
              {questions.map((q, idx) => (
                <div key={idx} className="space-y-2">
                  <p className="font-medium">{q}</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setAnswers({ ...answers, [idx]: "ja" })}
                      className={`px-4 py-2 rounded-md ${
                        answers[idx] === "ja" ? "bg-blue-600 text-white" : "bg-gray-100"
                      }`}
                    >
                      Ja
                    </button>
                    <button
                      onClick={() => setAnswers({ ...answers, [idx]: "nein" })}
                      className={`px-4 py-2 rounded-md ${
                        answers[idx] === "nein" ? "bg-blue-600 text-white" : "bg-gray-100"
                      }`}
                    >
                      Nein
                    </button>
                  </div>
                </div>
              ))}
            </div> , {/* <-- Schließendes div */}
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Empfohlene Produkte</h3>
            {resultProducts.length > 0 ? (
              resultProducts.map(({ produkt, gewichtung }) => (
                <button
                  key={produkt}
                  onClick={() => {
                    setSelectedProduct(produkt);
                    setShowAnalysisModal(false);
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 rounded-lg p-3 text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> {produkt}
                  </div>
                  <span className="text-xs text-gray-500">
                    Relevanz: {gewichtung}/5 – {gewichtLabels[gewichtung] || ""}
                  </span>
                </button>
              ))
            ) : (
              <p className="text-gray-500 italic">Es konnten keine spezifischen Empfehlungen abgeleitet werden.</p>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );    
  

  <>
  {/* Großes Modal mit Vertragsliste und Formular */}
  

  {/* Suche und Kacheln "Neue Versicherungen finden" */}


  {/* Persönlicher Bedarfscheck */}


      {/* Dialog-Modal für ausgewähltes Versicherungsfeld */}
      

      {/* Drawer (Sheet) für detaillierte Produktbeschreibung */}
      

      {/* Anleitungen (Videoanleitungen) */}
      



      
      <Dialog
        open={showAnalysisModal}
        onClose={() => {
          setShowAnalysisModal(false);
          setAnswers({});
          setShowResults(false);
        }}
    
        {...showResults ? (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Fragen zur Lebenssituation</h3>
            {questions.map((q, idx) => (
              <div key={idx} className="space-y-2">
                <p className="font-medium">{q}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setAnswers({ ...answers, [idx]: "ja" })}
                    className={`px-4 py-2 rounded-md ${
                      answers[idx] === "ja"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    onClick={() => setAnswers({ ...answers, [idx]: "nein" })}
                    className={`px-4 py-2 rounded-md ${
                      answers[idx] === "nein"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    Nein
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => setShowResults(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Auswertung anzeigen
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Empfohlene Produkte</h3>
            {resultProducts.length > 0 ? (
              resultProducts.map(({ produkt, gewichtung }) => (
                <button
                  key={produkt}
                  onClick={() => {
                    setSelectedProduct(produkt);
                    setShowAnalysisModal(false);
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 rounded-lg p-3 text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> {produkt}
                  </div>
                  <span className="text-xs text-gray-500">
                    Relevanz: {gewichtung}/5 – {gewichtLabels[gewichtung] || ""}
                  </span>
                </button>
              ))
            ) : (
              <p className="text-gray-500 italic">
                Es konnten keine spezifischen Empfehlungen abgeleitet werden.
              </p>
            )}
          </div>
        )}
}