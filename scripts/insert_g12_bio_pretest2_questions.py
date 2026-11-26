import json
import os

DB_PATH = 'data/db.json'
PDF_PATH = os.path.join('exams', 'Grade12', 'pretest', 'Biology_Part2.pdf')

with open(DB_PATH, 'r', encoding='utf-8') as f:
    db = json.load(f)

# Update exam_119_p2 metadata
file_size = os.path.getsize(PDF_PATH)
for exam in db.get('exams', []):
    if exam.get('id') == 'exam_119_p2':
        exam['title'] = 'Grade12 Biology Pre-test 2 (With Answer Sheet)'
        exam['fileSize'] = file_size
        exam['fileName'] = 'Biology_Part2.pdf'
        exam['fileUrl'] = '/exams/Grade12/pretest/Biology_Part2.pdf'
        break

# Prepare 52 authentic questions with verified teacher answers
raw_questions = [
    {
        "q": "Which of the following structures involved in cell division present in animal cells but not in higher plant cells ?",
        "opts": ["Centriole", "chromatid", "Chromosome", "microtubules"],
        "ans": 0,
        "exp": "Centrioles are absent in higher plant cells but present in animal cells to help organize mitotic spindle fibers."
    },
    {
        "q": "Which biological molecule spindle fibres contains ?",
        "opts": ["Polysaccharide", "protein", "nucleic acid", "lipid"],
        "ans": 1,
        "exp": "Spindle fibers are composed of microtubules, which are polymers of the protein tubulin."
    },
    {
        "q": "Which of these stages of cell division do chromatids separate and moves to its poles of the spindle ?",
        "opts": [
            "anaphase of mitosis and anaphase I of meiosis",
            "anaphase of mitosis and anaphase II of meiosis",
            "metaphase of mitosis and metaphase I of meiosis",
            "metaphase of mitosis and metaphase II of meiosis"
        ],
        "ans": 1,
        "exp": "Sister chromatids separate during anaphase of mitosis and anaphase II of meiosis (homologous chromosomes separate in anaphase I)."
    },
    {
        "q": "The longest phase of interphase is ?",
        "opts": ["G1 phase", "G2 phase", "S phase", "G 0 phase"],
        "ans": 0,
        "exp": "G1 (Gap 1) phase is typically the longest and most variable phase of the cell cycle."
    },
    {
        "q": "At which stage of mitosis do chromosomes uncoil and new nuclear envelope form ?",
        "opts": ["prophase", "metaphase", "telophase", "anaphase"],
        "ans": 2,
        "exp": "During telophase, chromosomes decondense/uncoil and a new nuclear envelope reforms around each set of daughter chromosomes."
    },
    {
        "q": "How many mitotic divisions of a meristematic cell in a root tip are needed to produce 256 daughter cells ?",
        "opts": ["8", "7", "128", "64"],
        "ans": 0,
        "exp": "Since each mitotic division doubles cell count (2^n), 2^8 = 256, requiring 8 rounds of division."
    },
    {
        "q": "What is the benefit to living organisms that water has a high specific heat capacity ?",
        "opts": [
            "Heat can be lost from the skin when water evaporates",
            "aquatic environments do not have a great fluctuation in their temperature",
            "It allows water to be a solvent for chemical reactions at body temperature",
            "none"
        ],
        "ans": 1,
        "exp": "High specific heat capacity buffers temperature changes, providing a thermally stable habitat for aquatic life."
    },
    {
        "q": "What is the term for the attraction of water molecules to other water molecules ?",
        "opts": ["Surface tension", "Cohesion", "Adhesion", "Capillarity"],
        "ans": 1,
        "exp": "Cohesion refers to intermolecular hydrogen bonding attraction between like water molecules."
    },
    {
        "q": "Which of the following lipids is the most abundant type found in the body ?",
        "opts": ["Cholesterol", "Triglycerides", "Phospholipids", "steroids"],
        "ans": 1,
        "exp": "Triglycerides are the main constituent of body fat and the most abundant lipid stored in adipose tissue."
    },
    {
        "q": "The primary structure of protein represents ?",
        "opts": [
            "three- dimensional structure of protein",
            "Linear sequence of amino acids joined by peptide bonds",
            "Sub –unit structure of protein",
            "Helical structure of protein"
        ],
        "ans": 1,
        "exp": "Primary structure is the unique linear sequence of amino acids linked by covalent peptide bonds."
    },
    {
        "q": "Haemoglobin has ?",
        "opts": ["quaternary structure", "tertiary structure", "Primary structure", "Secondary structure"],
        "ans": 0,
        "exp": "Haemoglobin consists of four polypeptide subunits (two alpha and two beta chains), exhibiting quaternary structure."
    },
    {
        "q": "A tri peptide has ?",
        "opts": [
            "three amino acids and two peptide bonds",
            "three amino acids and three peptide bonds",
            "two amino acids and two peptide bonds",
            "two amino acids and one peptide bonds"
        ],
        "ans": 0,
        "exp": "A tripeptide contains 3 amino acid residues linked by 2 peptide bonds."
    },
    {
        "q": "Which of the following is not a polysaccharide ?",
        "opts": ["lactose", "Starch", "cellulose", "glycogen"],
        "ans": 0,
        "exp": "Lactose is a disaccharide made of glucose and galactose, not a polysaccharide."
    },
    {
        "q": "Which of the following is the most abundant biomolecule on earth ?",
        "opts": ["Lipids", "Carbohydrates", "Proteins", "Nucleic acids"],
        "ans": 1,
        "exp": "Carbohydrates (specifically cellulose in plant cell walls) are the most abundant organic biomolecules on Earth."
    },
    {
        "q": "Which of the following lipids is commonly known as good cholesterol ?",
        "opts": [
            "Low density lipoprotein (LDL)",
            "High density lipoprotein (HDL)",
            "Triglycerides",
            "Phospholipids"
        ],
        "ans": 1,
        "exp": "High-density lipoprotein (HDL) removes excess cholesterol from arterial tissues to the liver and is known as 'good cholesterol'."
    },
    {
        "q": "Omega3 and omega 6 fatty acids are good examples of ?",
        "opts": [
            "polyunsaturated fatty acids",
            "Monounsaturated fatty acids",
            "Saturated fatty acids",
            "none"
        ],
        "ans": 0,
        "exp": "Omega-3 and omega-6 fatty acids contain two or more carbon-carbon double bonds and are polyunsaturated fatty acids (PUFAs)."
    },
    {
        "q": "If your BMI is less than 18.5 it falls with in ---- the range ?",
        "opts": ["Under weight", "Overweight", "Healthy weight", "Obesity"],
        "ans": 0,
        "exp": "A Body Mass Index (BMI) below 18.5 is categorized as underweight."
    },
    {
        "q": "Which of the following is the source of saturated fatty acids ?",
        "opts": ["olive oil", "butter", "corn oil", "linoleic acid"],
        "ans": 1,
        "exp": "Butter is an animal fat rich in saturated fatty acids, whereas olive oil and corn oil are rich in unsaturated fatty acids."
    },
    {
        "q": "all of the following are parts of a prokaryotic cell except ?",
        "opts": ["Cell wall", "Endoplasmic reticulum", "DNA", "Cell membrane"],
        "ans": 1,
        "exp": "Prokaryotes lack membrane-bound organelles such as the endoplasmic reticulum."
    },
    {
        "q": "If a cell is immersed in a hypertonic solution then which of the following is true ?",
        "opts": [
            "Water potential of the solution is less than water potential of the cell",
            "Water moves from the cell into the solution",
            "the solution has more solute than the cell",
            "all"
        ],
        "ans": 3,
        "exp": "In a hypertonic solution, solute concentration is higher outside, lowering water potential, causing water to exit the cell down its water potential gradient."
    },
    {
        "q": "Which of the following minerals functions by building strong bones and teeth ?",
        "opts": ["Iodine", "Calcium", "Iron", "Sodium"],
        "ans": 1,
        "exp": "Calcium (along with phosphate) is the primary structural mineral in hydroxyapatite crystals in bones and teeth."
    },
    {
        "q": "If the body weight of an athlete is 90kg and his body mass index (BMI) is 30kg/m2 then what will be the height of the athlete ?",
        "opts": ["1.532m", "1.723m", "1.732m", "1.632m"],
        "ans": 2,
        "exp": "BMI = weight / height^2 => 30 = 90 / h^2 => h^2 = 3 => h = sqrt(3) ≈ 1.732 m."
    },
    {
        "q": "In which direction does the transport of water occurs when a cell containing 1 % sodium chloride is placed in sea water that contains 10 % sodium chloride ?",
        "opts": [
            "from sea water to the cell",
            "from the cell to sea water",
            "No net movement of water",
            "none"
        ],
        "ans": 1,
        "exp": "Sea water (10% NaCl) is hypertonic relative to the cell cytoplasm (1% NaCl), driving osmotic movement of water out of the cell."
    },
    {
        "q": "What would happen to a person 's red blood cells if the person is given an injection of pure water (0% saline) ?",
        "opts": ["Plasmolysis", "Haemolysis", "Shrivel up", "turgid"],
        "ans": 1,
        "exp": "Pure water is hypotonic to erythrocytes; rapid osmotic water influx causes RBCs to swell and burst (haemolysis)."
    },
    {
        "q": "Which of the following organelles is found both in plant and animal cells ?",
        "opts": ["Centrioles", "Lysosomes", "Golgi bodies", "Chloroplasts"],
        "ans": 2,
        "exp": "Golgi apparatus/bodies are essential eukaryotic organelles present in both plant and animal cells."
    },
    {
        "q": "Which of the following organelles is abundant in phagocytic macrophages ?",
        "opts": ["Centriole", "Lysosomes", "Golgi bodies", "RER"],
        "ans": 1,
        "exp": "Macrophages engulf and digest cellular debris and pathogens using hydrolytic enzymes packed in lysosomes."
    },
    {
        "q": "What are the coding segments of eukaryotic DNA called ?",
        "opts": ["Introns", "Exons", "Transposons", "all"],
        "ans": 1,
        "exp": "Exons are expressed coding sequences retained in mature mRNA, while introns are non-coding intervening sequences spliced out."
    },
    {
        "q": "A particular triplet of bases in the antisense strand of DNA is AAG .The anticodon on the t-RNA that binds the m-RNA codon is ?",
        "opts": ["TTC", "AAG", "UUC", "none"],
        "ans": 1,
        "exp": "Antisense DNA (3'-AAG-5') transcribes to mRNA codon (5'-UUC-3'), which base-pairs with tRNA anticodon (3'-AAG-5')."
    },
    {
        "q": "Choose the answer that has these events of protein synthesis in the proper sequence:\n1. An aminoacyl t-RNA binds to the A-site\n2. A peptide bond forms between the new amino acid and a polypeptide chain\n3. t-RNA leaves the p-site and the p-site remains vacant\n4. A small ribosomal subunit binds with m-RNA\n5. t-RNA translocates to the p-site",
        "opts": ["1,3,2,4,5", "4,1,2,5,3", "5,4,3,2,1", "4,1,3,2,5"],
        "ans": 1,
        "exp": "Translation initiation begins with ribosome binding to mRNA (4), followed by elongation aminoacyl-tRNA entry at A site (1), peptide bond formation (2), translocation to P site (5), and exit (3)."
    },
    {
        "q": "Which of the following enzymes remove super coiling in replicating DNA a head of the replication fork ?",
        "opts": ["Helicase", "Topoisomerase", "Primases", "DNA polymerase"],
        "ans": 1,
        "exp": "DNA topoisomerase (gyrase) relieves torsional strain and supercoiling ahead of the replication fork."
    },
    {
        "q": "DNA replication is bidirectional and anti parallel ,which of the statements is true regarding to the DNA replication ?",
        "opts": [
            "addition of nucleotide occurs from the 5'-3' position",
            "The DNA replication is semi conservative with continuous leading strand and discontinuous lagging strand",
            "The synthesis of leading and lagging strand occurs simultaneously",
            "all"
        ],
        "ans": 3,
        "exp": "All listed statements correctly describe DNA replication: 5' to 3' synthesis, semiconservative leading/lagging mechanism, and simultaneous synthesis."
    },
    {
        "q": "Which defines a codon ?",
        "opts": [
            "a free floating base that attaches to an open strand",
            "The genetic code word of three bases on m-RNA that specifies one amino acid",
            "The genetic code of three bases on t-RNA that specify one amino acid",
            "none"
        ],
        "ans": 1,
        "exp": "A codon is a specific triplet sequence of ribonucleotides on mRNA encoding a particular amino acid or stop signal."
    },
    {
        "q": "A man who is a carrier for cystic fibrosis marries a woman who is a carrier for cystic fibrosis. What is the percentage probability that this couple will have a child with cystic fibrosis ?",
        "opts": ["50 %", "100 %", "75 %", "25%"],
        "ans": 3,
        "exp": "Cross of two heterozygous carriers (Cc x Cc) yields 25% homozygous recessive (cc), who express cystic fibrosis."
    },
    {
        "q": "A man who is a carrier for cystic fibrosis marries a woman who is a carrier for cystic fibrosis. What is the percentage probability that they will have a child who is a carrier ?",
        "opts": ["50 %", "100 %", "75%", "25%"],
        "ans": 0,
        "exp": "Cc x Cc cross produces 50% heterozygous carriers (Cc)."
    },
    {
        "q": "Which of the following is accurate about an x –linked trait ?",
        "opts": [
            "There is a 50 % chance that a son inherits an x –linked trait from his father",
            "There is a 0% chance that a son inherits an x –linked trait from his father",
            "There is a 0 % chance that a son inherits x- linked trait from his mother",
            "none"
        ],
        "ans": 1,
        "exp": "A father passes his Y chromosome to sons, so sons have a 0% chance of inheriting an X-linked allele from their father."
    },
    {
        "q": "The haemophilic mother under goes amniocentesis during her pregnancy ,and is told that the child she is carrying is a boy .what are the chances that her son will have haemophilia ?",
        "opts": ["50%", "0%", "100 %", "25 %"],
        "ans": 2,
        "exp": "A hemophilic mother (X^h X^h) always passes an affected X^h chromosome to her sons, resulting in a 100% chance of hemophilia in male offspring."
    },
    {
        "q": "In a di hybrid cross ,if the genes are being selected independently ( assorting ). What is the phenotypic ratio of the offspring in the F2 generation ?",
        "opts": ["3:1", "1:1", "9:3:3:1", "1:2:1"],
        "ans": 2,
        "exp": "A standard Mendelian dihybrid cross with independent assortment produces a classic 9:3:3:1 phenotypic ratio in the F2 generation."
    },
    {
        "q": "A form of vitamin D resistant rickets known as hypophosphatemia is inherited as an x-linked dominant trait ,if a man with hypophosphatemia marries a normal female ?",
        "opts": [
            "All of their sons would inherit the disease",
            "All of their daughters would inherit the disease",
            "About 50 % of their sons would inherit the disease",
            "about 50 % of their daughters would inherit the disease"
        ],
        "ans": 1,
        "exp": "An affected father (X^D Y) passes his affected X^D chromosome to 100% of his daughters and his Y chromosome to all sons."
    },
    {
        "q": "Which type of bonding is responsible for stabilizing the secondary structure of proteins ?",
        "opts": [
            "Peptide bonds between amino acids",
            "Hydrogen bonding between the C=O and N=H groups of peptide bonds",
            "Disulphide bridges between cysteine residues",
            "Salt bridges between charged side chain amino acids"
        ],
        "ans": 1,
        "exp": "Secondary structures (alpha-helices and beta-sheets) are stabilized by hydrogen bonds between the peptide backbone C=O and N-H groups."
    },
    {
        "q": "DNA polymerase synthesizes ?",
        "opts": [
            "DNA in 3'-5'direction",
            "DNA in 5'-3' direction",
            "m –RNA in 5'-3' direction",
            "none"
        ],
        "ans": 1,
        "exp": "DNA polymerase adds deoxynucleotides exclusively to the 3'-OH end of a growing strand, synthesizing in the 5' to 3' direction."
    },
    {
        "q": "The 3'-5' phosphor diester linkage joins ?",
        "opts": [
            "two DNA strands",
            "two nucleotides",
            "a nitrogenous base with pentose sugar",
            "none"
        ],
        "ans": 1,
        "exp": "Phosphodiester bonds link adjacent nucleotides along a nucleic acid strand by connecting 3' carbon of one sugar to 5' carbon of the next."
    },
    {
        "q": "If a plant with genotype RrYy is self fertilized the probability of getting RRYy genotype will be ( assume R and Y are not linked ) ?",
        "opts": ["1/16", "1/8", "1/4", "1/2"],
        "ans": 1,
        "exp": "Probability of RR from Rr x Rr is 1/4. Probability of Yy from Yy x Yy is 2/4 = 1/2. Combined probability = 1/4 * 1/2 = 1/8."
    },
    {
        "q": "Which of the following is incorrect with respect to aneuploidy ?",
        "opts": [
            "arises due to the non –disjunction of homologous pair of chromosomes",
            "arises due to the non disjunction of non homologous chromosomes",
            "one gamete comes to have an extra chromosome",
            "another gamete becomes deficient in one chromosome"
        ],
        "ans": 1,
        "exp": "Aneuploidy arises from nondisjunction of homologous chromosome pairs during meiosis I or sister chromatids in meiosis II, not non-homologous chromosomes."
    },
    {
        "q": "Which of the following statements is true about enzymes ?",
        "opts": [
            "Enzymes can be used repeatedly to catalyse the reaction",
            "Enzymes increase the over all change in free energy for a reaction",
            "Enzymes provide the activation energy for a reaction",
            "Enzymes are consumed in the reaction"
        ],
        "ans": 0,
        "exp": "Enzymes act as biological catalysts; they are unchanged at the end of the reaction and can be reused repeatedly."
    },
    {
        "q": "The Enzyme complex that catalyses alcoholic fermentation is ?",
        "opts": ["Zymase", "Lipase", "Invertase", "Amylase"],
        "ans": 0,
        "exp": "Zymase is an enzyme complex naturally found in yeasts that catalyzes the fermentation of sugar into ethanol and carbon dioxide."
    },
    {
        "q": "The lock and key model of enzyme action illustrates that a particular enzyme molecule ?",
        "opts": [
            "forms a permanent enzyme substrate complex",
            "Interacts with a specific type of substrate",
            "reacts at identical rate under all conditions",
            "may be destroyed and resynthesized several times"
        ],
        "ans": 1,
        "exp": "Emil Fischer's lock and key hypothesis proposes that the enzyme active site possesses a complementary rigid shape specific to its substrate."
    },
    {
        "q": "Glycosidases ,lipases and proteases belong to which class of enzymes ?",
        "opts": ["Ligases", "Hydrolases", "Isomerases", "Transferases"],
        "ans": 1,
        "exp": "Hydrolases catalyze hydrolysis reactions by breaking chemical bonds with the addition of water."
    },
    {
        "q": "----- is defined as the enzyme's binding efficiency with its appropriate substrate with optimised multiple non –covalent interactions ?",
        "opts": ["Kcat", "Km", "catalytic efficiency", "Vmax"],
        "ans": 1,
        "exp": "Km (Michaelis constant) reflects enzyme-substrate affinity; a lower Km indicates higher binding efficiency and affinity."
    },
    {
        "q": "What is the role of the enzyme catalase in cells ?",
        "opts": [
            "Synthesizes DNA",
            "breaks down hydrogen peroxide",
            "catalyses protein synthesis",
            "Converts glucose to ATP"
        ],
        "ans": 1,
        "exp": "Catalase protects cellular components by decomposing toxic hydrogen peroxide (H2O2) into water and oxygen."
    },
    {
        "q": "Which of the following reaction is catalysed by lyase ?",
        "opts": [
            "non hydrolytic cleavage of bonds",
            "formation of bonds",
            "intracellular rearrangement of bonds",
            "transfer of group from one molecule to another"
        ],
        "ans": 0,
        "exp": "Lyases catalyze the cleavage of C-C, C-O, C-N and other bonds by means other than hydrolysis or oxidation."
    },
    {
        "q": "Koshland's theory of enzyme action is known as ?",
        "opts": [
            "Induced fit theory",
            "Reduced fit theory",
            "Lock and key theory",
            "Enzyme coenzyme theory"
        ],
        "ans": 0,
        "exp": "Daniel Koshland introduced the Induced Fit Model in 1958, where enzyme active site conforms around the substrate upon binding."
    },
    {
        "q": "Enzymes that transfers phosphate group from one substrate to another is ?",
        "opts": ["Phosphatase", "Kinase", "transaminase", "phosphorylase"],
        "ans": 1,
        "exp": "Kinases are phosphotransferase enzymes that transfer phosphate groups from high-energy molecules like ATP to specific substrates."
    }
]

# Remove any previous pretest2 questions for Grade12 Biology
db['questions'] = [q for q in db.get('questions', []) if not (q.get('grade') == 'Grade12' and q.get('subject') == 'Biology' and q.get('examType') == 'Pretest2')]

new_questions = []
for i, item in enumerate(raw_questions, 1):
    new_questions.append({
        "id": f"q_g12_bio_pretest2_{i:02d}",
        "examId": "exam_119_p2",
        "grade": "Grade12",
        "subject": "Biology",
        "semester": "Pretest",
        "examType": "Pretest2",
        "question": item["q"],
        "options": item["opts"],
        "correctAnswer": item["ans"],
        "explanation": item["exp"],
        "points": 1
    })

db['questions'].extend(new_questions)

with open(DB_PATH, 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

print(f"Successfully added {len(new_questions)} questions to db.json! Total questions: {len(db['questions'])}")
