const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const outDir = path.join(__dirname, '..', 'exams', 'Grade11', 'Semester1', 'Mid1');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}
const outFile = path.join(outDir, 'Chemistry.pdf');

const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 36, bottom: 36, left: 45, right: 45 }
});

const writeStream = fs.createWriteStream(outFile);
doc.pipe(writeStream);

// Header
doc.fontSize(14).font('Helvetica-Bold').text('Blessed G/Michael Catholic Secondary School', { align: 'center' });
doc.fontSize(11).font('Helvetica-Bold').text('First Semester Chemistry mid exam for Grade 11th', { align: 'center' });
doc.fontSize(10).font('Helvetica').text('Nov, 2018 E.C.                                                                                     Time Allowed: 1:30', { align: 'center' });
doc.moveDown(0.4);
doc.fontSize(10).font('Helvetica').text('Name: ____________________________  Grade & section: ________  Roll no: _____', { align: 'left' });
doc.moveDown(0.4);

// Physical constants box
doc.rect(45, doc.y, 505, 42).stroke('#cccccc');
const boxY = doc.y + 4;
doc.fontSize(9.5).font('Helvetica-Bold').text('Physical constants:', 52, boxY);
doc.fontSize(8.5).font('Helvetica')
   .text('Speed of light in vacuum, c = 3.0 * 10^8 m/s', 52, boxY + 14)
   .text("Planck's constant, h = 6.626 * 10^-34 J·s", 280, boxY + 14)
   .text('Bohr radius, a0 = 0.0529 nm', 52, boxY + 26)
   .text('Rydberg constant, Rh = 2.18 * 10^-18 J', 280, boxY + 26);

doc.y = boxY + 44;
doc.moveDown(0.3);

doc.fontSize(10).font('Helvetica-Bold').text('I. Choose the best answer among the given alternatives', { underline: true });
doc.moveDown(0.3);

const questions = [
    {
        num: 1,
        text: 'Which of the following postulate of Daltons atomic theory disproved by the modern atomic theory?',
        options: [
            'Atoms of different element has different masses',
            'All atoms of the same element are identical and have the same masses',
            'elements are made up of small particles called atoms',
            'atoms combine in small whole number to form compound'
        ]
    },
    {
        num: 2,
        text: 'Which atomic model compared the structure of an atom with the solar system?',
        options: ["Dalton's", "Thomson's", "Rutherford's", "Quantum Mechanical"]
    },
    {
        num: 3,
        text: "Which of the following is not true about Bohr's atomic postulate?",
        options: [
            'The energy of an electron remains the same as long as it stays in the same orbit',
            'electrons release or absorb energy when they move between orbits',
            'electrons revolve around the nucleus in circular orbits',
            'When electrons fall from a higher (excited) state they absorb a fixed amount of energy.'
        ]
    },
    {
        num: 4,
        text: 'Carbon has two isotopes, C-12 and C-13 that exists in 9:1 abundance ratio. Determine the average atomic mass of carbon?',
        options: ['12.1 amu', '13.2 amu', '12.5 amu', '13.1 amu']
    },
    {
        num: 5,
        text: 'A light with a wavelength of 400nm strikes the metal surface of metallic cesium in a photocell, and the maximum kinetic energy of the electron ejected is 1.54 * 10^-19 J. Calculate the work function of cesium.',
        options: ['3.34 * 10^-19 J', '4.97 * 10^-19 J', '5.18 * 10^14 J', '4.0 * 10^7 J']
    },
    {
        num: 6,
        text: 'What is the wavelength associated with an electron of mass, m = 9.11 * 10^-28 g travelling at 40% of the velocity of light?',
        options: ['6.06 * 10^-15 m', '2.42 * 10^-15 m', '6.06 * 10^-12 m', '2.42 * 10^-11 m']
    },
    {
        num: 7,
        text: 'What would be the wavelength of a radio wave having frequency of 3MHz?',
        options: ['300 nm', '100 m', '300 m', '100 nm']
    },
    {
        num: 8,
        text: 'Which color corresponds to light of the longest wavelength?',
        options: ['Green', 'Red', 'Yellow', 'Blue']
    },
    {
        num: 9,
        text: 'Which of the following is fundamentally different from the other?',
        options: ['Radio wave', 'Light wave', 'Sound wave', 'Micro wave']
    },
    {
        num: 10,
        text: 'What is the frequency of light having a wavelength of 4.5 * 10^-5 cm?',
        options: ['2.84 * 10^-12 Hz', '2.1 * 10^4 Hz', '6.67 * 10^14 Hz', '4.29 * 10^14 Hz']
    },
    {
        num: 11,
        text: 'Which of the following is not true about cathode rays? Cathode rays',
        options: [
            'travel in straight lines from cathode to the anode.',
            'Contain particles, which are negatively charged.',
            'are common constituents of all matter and their m/e is constant for all gases.',
            'contains particles, which are positively charged.'
        ]
    },
    {
        num: 12,
        text: 'Which of the following is not true about the photoelectric effect?',
        options: [
            'most metals require ultraviolet light to emit electrons.',
            'a bright light causes more electrons to be emitted than a weak light.',
            'a bright light causes fewer electrons to be emitted than a weak light.',
            'higher frequency light emits electrons with higher kinetic energy.'
        ]
    },
    {
        num: 13,
        text: 'The maximum kinetic energy of a photoelectron emitted from metal is 1.03 * 10^-19 J when light that has a 656nm wavelength shines on the surface. What is the threshold frequency for this metal?',
        options: ['4.57 * 10^14 s^-1', '3.02 * 10^14 s^-1', '3.02 * 10^14 s^-1', '4.57 * 10^14 s^-1']
    },
    {
        num: 14,
        text: 'Which of the following transition will have minimum wavelength?',
        options: ['n4 -> n1', 'n2 -> n1', 'n4 -> n2', 'n3 -> n1']
    },
    {
        num: 15,
        text: 'What is the energy associated with one photon of microwave radiation having frequency of 2.45 * 10^9 s^-1?',
        options: ['1.62 * 10^24 J', '2.45 * 10^9 J', '2.45 * 10^3 J', '1.62 * 10^-24 J']
    },
    {
        num: 16,
        text: 'What is the distance that a radio wave will travel in 0.25 sec?',
        options: ['1.2 * 10^7 m', '12 * 10^7 m', '7.5 * 10^7 m', '5.6 * 10^7 m']
    },
    {
        num: 17,
        text: 'The wave number of an electromagnetic radiation is 1 * 10^5 cm^-1. The frequency of the radiation would be:',
        options: ['3 * 10^8 s^-1', '3 * 10^6 s^-1', '3 * 10^10 s^-1', '3 * 10^15 s^-1']
    },
    {
        num: 18,
        text: 'The velocity of two particles A and B are 0.05 ms^-1 and 0.01 ms^-1 respectively. The mass of B is five times of mass of A, the ratio of their De Broglie wavelength is;',
        options: ['2:1', '1:4', '1:1', '4:1']
    },
    {
        num: 19,
        text: 'The De Broglie wavelength of an electron waves in two orbits are 3:5. The ratio of kinetic energy of electron will be;',
        options: ['25:9', '5:3', '9:25', '3:5']
    },
    {
        num: 20,
        text: 'The rest mass of a proton is 1.673 * 10^-27 Kg and that of the electron is 9.109 * 10^-31 Kg. What must be the speed of the proton which has the same De Broglie wavelength as an electron moving with a speed of 9 * 10^6 m/s?',
        options: ['3600 m/s', '4900 m/s', '4300 m/s', '5600 m/s']
    },
    {
        num: 21,
        text: 'The Bohr orbit radius for the hydrogen atom (n=1) is approximately 0.53 Å. The radius for the first excited state (n=2) orbit is (in Å):',
        options: ['4.77', '0.13', '1.06', '2.12']
    },
    {
        num: 22,
        text: 'The radius of hydrogen atom in the ground state is 0.53 Å. The radius of Li^2+ ion (atomic number=3) in a similar state (in Å) is;',
        options: ['0.53', '0.17', '1.06', '0.265']
    },
    {
        num: 23,
        text: 'The ratio of the speed of electron in first orbit of hydrogen atom to speed of light in vacuum is;',
        options: ['137', '1/137', '100', '10^-2']
    },
    {
        num: 24,
        text: 'Which of the following particle was discovered by the cathode experiment?',
        options: ['electrons', 'neutrons', 'nucleus', 'protons']
    },
    {
        num: 25,
        text: "What aspect of modern view of atomic structure was proved by Rutherford's gold foil experiment?",
        options: ['the charge on a particle', 'the existence of the nucleus', 'the charge on an electron', 'the existence of electrons']
    }
];

questions.forEach(q => {
    if (doc.y > 720) {
        doc.addPage();
    }
    doc.fontSize(9.5).font('Helvetica-Bold').text(`${q.num}. `, { continued: true });
    doc.font('Helvetica').text(q.text);
    doc.moveDown(0.15);

    const labels = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
        doc.fontSize(9).font('Helvetica-Bold').text(`     ${labels[idx]}. `, { continued: true });
        doc.font('Helvetica').text(opt);
    });
    doc.moveDown(0.35);
});

// Bonus section
if (doc.y > 680) doc.addPage();
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica-Bold').text('BONUS (show all necessary steps) (2pt):', { underline: true });
doc.fontSize(9.5).font('Helvetica').text('Surface of a certain metal is first illuminated with light of wavelength λ1 = 350 nm and then by light of wavelength λ2 = 540 nm. It is found that maximum speed of the electrons in the two cases differ by factor of 2. The work function of the metal (eV) is close to ________ (energy of photon = (1240/λ) eV)');

doc.end();

writeStream.on('finish', () => {
    const stats = fs.statSync(outFile);
    console.log(`PDF created successfully: ${outFile} (${stats.size} bytes)`);
});
