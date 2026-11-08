// Grade 12 Biology Final Examination (exam_87)
// Authentic curriculum questions strictly aligned with Ethiopian Grade 12 Biology Syllabus:
// Unit 1: Applications of Biology, Unit 2: Energy Transformation (Cellular Respiration & Photosynthesis),
// Unit 3: Molecular Biology & Genetics, Unit 4: Evolution, Unit 5: Behavioral Biology

const grade12BioQuestions = [
  // --- Section 1: True / False ---
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Glycolysis occurs in the cytosol of the cell and requires molecular oxygen (O2) to proceed.",
    options: ["True", "False"],
    correctAnswer: 1, // False
    explanation: "Glycolysis is an anaerobic process occurring in the cytoplasm (cytosol) that does not require oxygen.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "In DNA replication, the leading strand is synthesized continuously in the 5' to 3' direction.",
    options: ["True", "False"],
    correctAnswer: 0, // True
    explanation: "DNA polymerase synthesizes the new strand in the 5' to 3' direction, allowing continuous synthesis along the leading strand.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Restriction endonucleases are bacterial enzymes that cut DNA molecules at specific palindromic recognition sequences.",
    options: ["True", "False"],
    correctAnswer: 0, // True
    explanation: "Restriction enzymes recognize and cleave specific palindromic DNA sequences, acting as molecular scissors in biotechnology.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Photolysis of water occurs during the light-independent Calvin cycle reactions inside the stroma of chloroplasts.",
    options: ["True", "False"],
    correctAnswer: 1, // False
    explanation: "Photolysis occurs at Photosystem II in the thylakoid lumen during the light-dependent reactions, not in the Calvin cycle.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Fixed action patterns (FAPs) are innate, stereotypic behavioral sequences triggered by a sign stimulus or releaser.",
    options: ["True", "False"],
    correctAnswer: 0, // True
    explanation: "Fixed action patterns are genetically programmed, unlearned behaviors that run to completion once triggered by a sign stimulus.",
    points: 1
  },

  // --- Section 2: Multiple Choice Questions ---
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following is the final electron acceptor in mitochondrial aerobic respiration?",
    options: [
      "NAD+",
      "Cytochrome c",
      "Molecular oxygen (O2)",
      "Pyruvate"
    ],
    correctAnswer: 2,
    explanation: "In oxidative phosphorylation, electrons transfer through the electron transport chain to molecular oxygen, which combines with protons to form water.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "During the Krebs cycle (citric acid cycle), how many molecules of NADH are produced per single turn from one acetyl-CoA molecule?",
    options: [
      "1 NADH",
      "2 NADH",
      "3 NADH",
      "4 NADH"
    ],
    correctAnswer: 2,
    explanation: "One turn of the Krebs cycle produces 3 NADH, 1 FADH2, 1 ATP (or GTP), and releases 2 CO2 molecules.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "In C4 plants such as maize and sorghum, the initial fixation of atmospheric carbon dioxide is catalyzed by:",
    options: [
      "RuBisCO in mesophyll cells",
      "PEP carboxylase in mesophyll cells",
      "RuBisCO in bundle sheath cells",
      "ATP synthase in thylakoid membranes"
    ],
    correctAnswer: 1,
    explanation: "PEP carboxylase has high affinity for CO2 without oxygenase activity, fixing CO2 into a 4-carbon oxaloacetate in mesophyll cells.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Which enzyme is responsible for sealing nicks and joining Okazaki fragments in the lagging strand of replicating DNA?",
    options: [
      "DNA Helicase",
      "DNA Ligase",
      "RNA Primase",
      "Topoisomerase"
    ],
    correctAnswer: 1,
    explanation: "DNA ligase catalyzes the formation of phosphodiester bonds between adjacent Okazaki fragments.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "During protein biosynthesis, peptide bond formation between incoming amino acids in the ribosome is catalyzed by:",
    options: [
      "Aminoacyl-tRNA synthetase",
      "Peptidyl transferase (ribozyme)",
      "RNA polymerase II",
      "Elongation factor EF-Tu"
    ],
    correctAnswer: 1,
    explanation: "Peptidyl transferase, an RNA component of the large ribosomal subunit (ribozyme), catalyzes peptide bond synthesis.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "The anticodon on a tRNA molecule that corresponds to the start codon AUG is:",
    options: [
      "3'-UAC-5'",
      "5'-UAC-3'",
      "3'-TAC-5'",
      "5'-AUG-3'"
    ],
    correctAnswer: 0,
    explanation: "The start codon 5'-AUG-3' base-pairs antiparallel with the tRNA anticodon 3'-UAC-5' carrying methionine.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Which type of mutation involves the insertion or deletion of nucleotides that shifts the genetic reading frame?",
    options: [
      "Silent mutation",
      "Missense mutation",
      "Frameshift mutation",
      "Nonsense mutation"
    ],
    correctAnswer: 2,
    explanation: "Insertion or deletion of bases not in multiples of three alters the triplet reading frame downstream, known as a frameshift mutation.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "In the polymerase chain reaction (PCR), what is the primary purpose of heating the reaction mixture to approximately 94°C–96°C?",
    options: [
      "Annealing primers to template DNA",
      "Elongation of target DNA strands",
      "Denaturation of double-stranded DNA",
      "Activating the Taq DNA polymerase"
    ],
    correctAnswer: 2,
    explanation: "The high temperature (94–96°C) breaks the hydrogen bonds between complementary bases, denaturing DNA into single strands.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Which vectors are most commonly utilized to transfer foreign recombinant genes into plant genomes, such as in creating GM crops?",
    options: [
      "Bacteriophage lambda",
      "Ti plasmid of Agrobacterium tumefaciens",
      "SV40 mammalian virus",
      "pBR322 human artificial chromosome"
    ],
    correctAnswer: 1,
    explanation: "The tumor-inducing (Ti) plasmid of Agrobacterium tumefaciens naturally transfers T-DNA into plant cell nuclei, making it ideal for genetic engineering.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "A cross between a homozygous dominant purple flower (PP) and a homozygous recessive white flower (pp) produces F1 heterozygous purple flowers (Pp). If F1 plants self-pollinate, what is the phenotypic ratio in the F2 generation?",
    options: [
      "1 purple : 1 white",
      "3 purple : 1 white",
      "9 purple : 3 white : 3 red : 1 pink",
      "1 purple : 2 intermediate : 1 white"
    ],
    correctAnswer: 1,
    explanation: "A monohybrid cross of heterozygous individuals (Pp x Pp) yields a classic 3:1 dominant to recessive phenotypic ratio.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "According to the operon model in Escherichia coli, what binds to the operator region to prevent transcription of structural genes in the lac operon?",
    options: [
      "CAP-cAMP complex",
      "Active repressor protein",
      "Allolactose inducer",
      "RNA polymerase holoenzyme"
    ],
    correctAnswer: 1,
    explanation: "In the absence of lactose, the active repressor protein binds to the operator locus, physically blocking RNA polymerase.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following structures is homologous to the wing of a bird?",
    options: [
      "The wing of an insect",
      "The flipper of a whale",
      "The tail fin of a shark",
      "The tentacle of an octopus"
    ],
    correctAnswer: 1,
    explanation: "Bird wings and whale flippers share a common evolutionary ancestor and anatomical bone arrangement (pentadactyl limb), indicating homology.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "In population genetics, which condition is REQUIRED to maintain Hardy-Weinberg genetic equilibrium in a population?",
    options: [
      "High rate of gene flow",
      "Frequent beneficial mutations",
      "Small population size",
      "Random mating within the population"
    ],
    correctAnswer: 3,
    explanation: "Hardy-Weinberg equilibrium assumes random mating, extremely large population size, absence of natural selection, no mutations, and no gene flow.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Speciation that occurs when populations are geographically isolated by physical barriers such as mountain ranges or rivers is called:",
    options: [
      "Sympatric speciation",
      "Allopatric speciation",
      "Parapatric speciation",
      "Peripatric speciation"
    ],
    correctAnswer: 1,
    explanation: "Allopatric speciation occurs when physical geographic separation prevents gene flow between diverging subpopulations.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "A decreasing response to a repeated stimulus that carries neither reward nor punishment is an example of:",
    options: [
      "Classical conditioning",
      "Operant conditioning",
      "Habituation",
      "Imprinting"
    ],
    correctAnswer: 2,
    explanation: "Habituation is a simple learned behavior where an organism learns to ignore a persistent, non-threatening, biologically irrelevant stimulus.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Konrad Lorenz showed that newly hatched goslings follow the first moving object they see during a critical period. This form of learning is known as:",
    options: [
      "Imprinting",
      "Latent learning",
      "Trial-and-error learning",
      "Insight learning"
    ],
    correctAnswer: 0,
    explanation: "Imprinting is rapid, irreversible learning occurring strictly within a sensitive or critical early developmental window.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "In classical conditioning, Pavlov demonstrated that dogs salivate to the ringing of a bell after pairing the sound with food. Here, the bell sound acts as the:",
    options: [
      "Unconditioned stimulus",
      "Conditioned stimulus",
      "Unconditioned response",
      "Operant reinforcer"
    ],
    correctAnswer: 1,
    explanation: "The bell is originally a neutral stimulus; after associative pairing with meat powder, it becomes the conditioned stimulus (CS).",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following hormones stimulates ripening in climacteric fruits such as bananas and tomatoes?",
    options: [
      "Auxin",
      "Gibberellin",
      "Ethylene",
      "Abscisic acid"
    ],
    correctAnswer: 2,
    explanation: "Ethylene is a gaseous plant hormone that promotes fruit ripening, flower senescence, and leaf abscission.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "During anaphase I of meiosis, what homologous structures separate and migrate toward opposite poles?",
    options: [
      "Sister chromatids",
      "Homologous chromosome pairs (bivalents)",
      "Non-homologous chromosomes",
      "Centrioles"
    ],
    correctAnswer: 1,
    explanation: "In anaphase I, homologous chromosomes separate, reducing ploidy from diploid (2n) to haploid (n). Sister chromatids separate in anaphase II.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "The chemical energy released during oxidative phosphorylation is directly coupled to ATP synthesis by:",
    options: [
      "The flow of protons down their electrochemical gradient through ATP synthase",
      "Direct substrate-level phosphorylation of glucose",
      "The active pumping of sodium ions into the mitochondrial matrix",
      "The breakdown of carbon dioxide in the matrix"
    ],
    correctAnswer: 0,
    explanation: "Chemiosmosis describes how the proton-motive force drives H+ through the FoF1 ATP synthase complex to synthesize ATP from ADP and Pi.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "In gel electrophoresis, DNA fragments separate based primarily on differences in:",
    options: [
      "Electric charge alone",
      "Molecular weight and fragment length",
      "Base composition (ratio of A-T to G-C)",
      "Isoelectric point"
    ],
    correctAnswer: 1,
    explanation: "Because all DNA fragments have a uniform negative charge-to-mass ratio, the agarose matrix sieves them strictly by size/length.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "A man with blood type A (heterozygous IAi) marries a woman with blood type B (heterozygous IBi). What blood types are possible among their children?",
    options: [
      "Only type AB",
      "Only types A and B",
      "Types A, B, and AB only",
      "Types A, B, AB, and O"
    ],
    correctAnswer: 3,
    explanation: "The possible offspring genotypes are IAIB (type AB), IAi (type A), IBi (type B), and ii (type O), each with a 25% probability.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following is an example of an organelle that contains its own circular DNA and 70S ribosomes?",
    options: [
      "Golgi apparatus",
      "Lysosome",
      "Mitochondria",
      "Endoplasmic reticulum"
    ],
    correctAnswer: 2,
    explanation: "The endosymbiotic theory highlights that mitochondria and chloroplasts contain their own circular genomes and prokaryotic 70S ribosomes.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "In eukaryotic pre-mRNA processing, which modifications are required before export to the cytoplasm for translation?",
    options: [
      "Addition of a 5' methyl-guanosine cap, 3' poly-A tail, and splicing of introns",
      "Removal of exons and retention of non-coding introns",
      "Binding of reverse transcriptase and cleavage of telomeres",
      "Phosphorylation of histone octamers"
    ],
    correctAnswer: 0,
    explanation: "Mature mRNA undergoes 5' capping, 3' polyadenylation, and spliceosomal removal of non-coding introns with ligated exons.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following evolutionary forces is primarily responsible for introducing novel alleles into a gene pool?",
    options: [
      "Genetic drift",
      "Natural selection",
      "Mutation",
      "Assortative mating"
    ],
    correctAnswer: 2,
    explanation: "Mutation is the ultimate source of new genetic variation and novel alleles upon which selection and drift act.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Altruistic behavior among social insects (such as sterile worker honeybees defending the queen) is best explained by:",
    options: [
      "Group selection alone",
      "Kin selection and inclusive fitness",
      "Operant conditioning",
      "Directional selection for body size"
    ],
    correctAnswer: 1,
    explanation: "According to Hamilton's rule, kin selection favors altruistic behaviors that enhance the reproductive survival of close genetic relatives.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "The light-dependent reactions of photosynthesis yield two vital energy-rich products used directly in the Calvin cycle:",
    options: [
      "Glucose and O2",
      "ATP and NADPH",
      "FADH2 and Pyruvate",
      "NADP+ and ADP"
    ],
    correctAnswer: 1,
    explanation: "The thylakoid light reactions generate ATP (energy currency) and NADPH (reducing power) required for sugar synthesis in the Calvin cycle.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Sickle-cell trait provides resistance against severe malaria in heterozygous individuals (HbA HbS). This survival advantage exemplifies:",
    options: [
      "Heterozygote advantage (balancing selection)",
      "Directional selection",
      "Disruptive selection",
      "Sexual selection"
    ],
    correctAnswer: 0,
    explanation: "Heterozygotes survive malaria better than normal homozygotes and avoid sickle-cell disease, maintaining both alleles through balancing selection.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Which type of learning involves solving a novel problem through sudden understanding of relationships without prior trial-and-error?",
    options: [
      "Habituation",
      "Insight learning",
      "Classical conditioning",
      "Sensitization"
    ],
    correctAnswer: 1,
    explanation: "Insight learning (cognitive reasoning) allows an animal or human to devise a problem-solving solution mentally on the first attempt.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "In the lac operon of E. coli, when both glucose and lactose are abundant in the growth medium:",
    options: [
      "The lac operon is transcribed at its maximum possible rate",
      "cAMP levels are low, preventing high-level transcription (catabolite repression)",
      "The repressor binds irreversibly to the promoter",
      "Beta-galactosidase synthesizes glucose from starch"
    ],
    correctAnswer: 1,
    explanation: "Glucose lowers cellular cAMP levels; without cAMP-CAP binding to the promoter, lac transcription remains very low even when lactose is present.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following cellular processes generates the highest net yield of ATP molecules per oxidized mole of glucose?",
    options: [
      "Alcoholic fermentation",
      "Lactic acid fermentation",
      "Glycolysis",
      "Mitochondrial oxidative phosphorylation"
    ],
    correctAnswer: 3,
    explanation: "Oxidative phosphorylation generates approximately 26 to 28 ATP per glucose, far exceeding the 2 ATP from glycolysis or fermentations.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Recombinant human insulin is commercially produced in bulk using genetically engineered:",
    options: [
      "Escherichia coli bacteria",
      "Tobacco mosaic virus",
      "Drosophila melanogaster",
      "Amphibian oocytes"
    ],
    correctAnswer: 0,
    explanation: "E. coli bacteria transformed with human proinsulin cDNA plasmids are cultured in fermenters to synthesize commercial recombinant insulin (Humulin).",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "What is the primary function of transfer RNA (tRNA) in protein synthesis?",
    options: [
      "Carrying genomic instructions from nucleus to ribosomes",
      "Delivering specific amino acids to the ribosome based on codon recognition",
      "Forming the catalytic peptide bond between amino acids",
      "Phosphorylating ribosomal subunits"
    ],
    correctAnswer: 1,
    explanation: "tRNA adapter molecules carry specific amino acids at their 3' CCA end and read corresponding mRNA codons using their anticodon loop.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Fossilized remains of Australopithecus afarensis ('Lucy' or 'Dinkinesh') discovered in the Afar depression of Ethiopia provided crucial evidence for:",
    options: [
      "The evolution of modern industrial tools",
      "Early obligate bipedal locomotion in hominid evolution",
      "The invention of agricultural cultivation",
      "Neanderthal gene flow into African populations"
    ],
    correctAnswer: 1,
    explanation: "Lucy's pelvic and knee anatomy established that upright bipedal walking preceded encephalization (large brain development) in early hominins.",
    points: 1
  },
  {
    examId: "exam_87",
    grade: "Grade12",
    subject: "Biology",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following statements correctly characterizes an enzyme-catalyzed reaction?",
    options: [
      "Enzymes increase the activation energy of the transition state",
      "Enzymes are consumed and depleted during the biochemical reaction",
      "Enzymes decrease activation energy without altering the overall free energy change (ΔG)",
      "Enzymes shift the chemical equilibrium constant toward irreversible products"
    ],
    correctAnswer: 2,
    explanation: "Biological catalysts lower activation energy barrier (Ea) to accelerate reaction rates without changing ΔG or chemical equilibrium.",
    points: 1
  }
];

module.exports = { grade12BioQuestions };
