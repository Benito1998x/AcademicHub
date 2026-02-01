import { AcademicWork, Tag } from '@/types/academic';

export const DEFAULT_TAGS: Tag[] = [
  { id: 'tag-1', name: 'Importante', color: 'hsl(0, 84%, 60%)' },
  { id: 'tag-2', name: 'Final', color: 'hsl(210, 100%, 40%)' },
  { id: 'tag-3', name: 'Parcial', color: 'hsl(38, 92%, 50%)' },
  { id: 'tag-4', name: 'Grupal', color: 'hsl(142, 76%, 36%)' },
  { id: 'tag-5', name: 'Individual', color: 'hsl(199, 89%, 48%)' },
  { id: 'tag-6', name: 'Investigación', color: 'hsl(270, 70%, 50%)' },
];

export const SUBJECTS = [
  'Matemáticas',
  'Física',
  'Química',
  'Programación',
  'Base de Datos',
  'Estadística',
  'Economía',
  'Administración',
  'Inglés',
  'Historia',
  'Filosofía',
  'Comunicación',
];

export const PROFESSORS = [
  'Dr. García López',
  'Dra. Martínez Ruiz',
  'Ing. Rodríguez Paz',
  'Lic. Fernández Castro',
  'Mtro. Sánchez Mora',
  'Dra. López Herrera',
  'Ing. Pérez Gómez',
  'Dr. Ramírez Silva',
];

export const UNIVERSITIES = [
  'Universidad Nacional Autónoma de México',
  'Instituto Politécnico Nacional',
  'Universidad Autónoma Metropolitana',
  'Tecnológico de Monterrey',
  'Universidad de Guadalajara',
  'Universidad Iberoamericana',
  'Instituto Tecnológico Autónomo de México',
];

export const SEMESTERS = [
  '2024-1',
  '2024-2',
  '2023-1',
  '2023-2',
  '2022-1',
  '2022-2',
];

export const MOCK_WORKS: AcademicWork[] = [
  {
    id: '1',
    name: 'Análisis de Algoritmos de Ordenamiento',
    subject: 'Programación',
    workType: 'proyecto',
    documentType: 'pdf',
    professor: 'Ing. Rodríguez Paz',
    university: 'Universidad Nacional Autónoma de México',
    semester: '2024-2',
    date: '2024-11-15',
    fileName: 'analisis_algoritmos_ordenamiento.pdf',
    fileSize: 2500000,
    tags: [DEFAULT_TAGS[0], DEFAULT_TAGS[3]],
    isTemplate: false,
    version: 1,
    description: 'Proyecto final sobre comparación de algoritmos de ordenamiento',
    createdAt: '2024-11-15T10:30:00Z',
    updatedAt: '2024-11-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Informe de Laboratorio - Reacciones Químicas',
    subject: 'Química',
    workType: 'informe',
    documentType: 'word',
    professor: 'Dra. Martínez Ruiz',
    university: 'Instituto Politécnico Nacional',
    semester: '2024-2',
    date: '2024-11-10',
    fileName: 'laboratorio_reacciones_quimicas.docx',
    fileSize: 1800000,
    tags: [DEFAULT_TAGS[4]],
    isTemplate: true,
    version: 3,
    description: 'Informe de laboratorio sobre reacciones químicas exotérmicas',
    createdAt: '2024-11-10T14:20:00Z',
    updatedAt: '2024-11-12T09:15:00Z',
  },
  {
    id: '3',
    name: 'Presentación - Historia del Arte Moderno',
    subject: 'Historia',
    workType: 'presentacion',
    documentType: 'powerpoint',
    professor: 'Dr. Ramírez Silva',
    university: 'Tecnológico de Monterrey',
    semester: '2024-2',
    date: '2024-11-08',
    fileName: 'historia_arte_moderno.pptx',
    fileSize: 5200000,
    tags: [DEFAULT_TAGS[3], DEFAULT_TAGS[1]],
    isTemplate: false,
    version: 1,
    createdAt: '2024-11-08T16:45:00Z',
    updatedAt: '2024-11-08T16:45:00Z',
  },
  {
    id: '4',
    name: 'Análisis Estadístico de Datos de Ventas',
    subject: 'Estadística',
    workType: 'proyecto',
    documentType: 'excel',
    professor: 'Lic. Fernández Castro',
    university: 'Universidad Autónoma Metropolitana',
    semester: '2024-2',
    date: '2024-11-05',
    fileName: 'analisis_estadistico_ventas.xlsx',
    fileSize: 890000,
    tags: [DEFAULT_TAGS[0], DEFAULT_TAGS[5]],
    isTemplate: false,
    version: 2,
    createdAt: '2024-11-05T11:00:00Z',
    updatedAt: '2024-11-06T15:30:00Z',
  },
  {
    id: '5',
    name: 'Ensayo sobre Ética Profesional',
    subject: 'Filosofía',
    workType: 'ensayo',
    documentType: 'pdf',
    professor: 'Dr. García López',
    university: 'Universidad Iberoamericana',
    semester: '2024-2',
    date: '2024-10-28',
    fileName: 'ensayo_etica_profesional.pdf',
    fileSize: 450000,
    tags: [DEFAULT_TAGS[4]],
    isTemplate: true,
    version: 1,
    createdAt: '2024-10-28T09:20:00Z',
    updatedAt: '2024-10-28T09:20:00Z',
  },
  {
    id: '6',
    name: 'Diseño de Base de Datos Relacional',
    subject: 'Base de Datos',
    workType: 'proyecto',
    documentType: 'pdf',
    professor: 'Ing. Pérez Gómez',
    university: 'Instituto Tecnológico Autónomo de México',
    semester: '2024-2',
    date: '2024-10-22',
    fileName: 'diseno_bd_relacional.pdf',
    fileSize: 3100000,
    tags: [DEFAULT_TAGS[0], DEFAULT_TAGS[1]],
    isTemplate: false,
    version: 1,
    createdAt: '2024-10-22T13:40:00Z',
    updatedAt: '2024-10-22T13:40:00Z',
  },
  {
    id: '7',
    name: 'Examen Parcial - Cálculo Diferencial',
    subject: 'Matemáticas',
    workType: 'examen',
    documentType: 'pdf',
    professor: 'Dr. García López',
    university: 'Universidad Nacional Autónoma de México',
    semester: '2024-2',
    date: '2024-10-15',
    fileName: 'examen_calculo_diferencial.pdf',
    fileSize: 680000,
    tags: [DEFAULT_TAGS[2]],
    isTemplate: false,
    version: 1,
    createdAt: '2024-10-15T08:00:00Z',
    updatedAt: '2024-10-15T08:00:00Z',
  },
  {
    id: '8',
    name: 'Tarea - Ejercicios de Física Mecánica',
    subject: 'Física',
    workType: 'tarea',
    documentType: 'word',
    professor: 'Dra. López Herrera',
    university: 'Instituto Politécnico Nacional',
    semester: '2024-2',
    date: '2024-10-10',
    fileName: 'tarea_fisica_mecanica.docx',
    fileSize: 520000,
    tags: [DEFAULT_TAGS[4]],
    isTemplate: false,
    version: 1,
    createdAt: '2024-10-10T17:30:00Z',
    updatedAt: '2024-10-10T17:30:00Z',
  },
  {
    id: '9',
    name: 'Informe Financiero Trimestral',
    subject: 'Economía',
    workType: 'informe',
    documentType: 'excel',
    professor: 'Mtro. Sánchez Mora',
    university: 'Tecnológico de Monterrey',
    semester: '2024-1',
    date: '2024-05-20',
    fileName: 'informe_financiero_q1.xlsx',
    fileSize: 1250000,
    tags: [DEFAULT_TAGS[3], DEFAULT_TAGS[0]],
    isTemplate: true,
    version: 2,
    createdAt: '2024-05-20T10:15:00Z',
    updatedAt: '2024-05-25T14:00:00Z',
  },
  {
    id: '10',
    name: 'Proyecto de Investigación - Marketing Digital',
    subject: 'Administración',
    workType: 'proyecto',
    documentType: 'powerpoint',
    professor: 'Lic. Fernández Castro',
    university: 'Universidad de Guadalajara',
    semester: '2024-1',
    date: '2024-05-15',
    fileName: 'investigacion_marketing_digital.pptx',
    fileSize: 8900000,
    tags: [DEFAULT_TAGS[5], DEFAULT_TAGS[1]],
    isTemplate: false,
    version: 1,
    createdAt: '2024-05-15T12:00:00Z',
    updatedAt: '2024-05-15T12:00:00Z',
  },
  {
    id: '11',
    name: 'Ensayo - Reading Comprehension',
    subject: 'Inglés',
    workType: 'ensayo',
    documentType: 'word',
    professor: 'Dra. Martínez Ruiz',
    university: 'Universidad Iberoamericana',
    semester: '2024-1',
    date: '2024-04-28',
    fileName: 'reading_comprehension_essay.docx',
    fileSize: 320000,
    tags: [DEFAULT_TAGS[4]],
    isTemplate: false,
    version: 1,
    createdAt: '2024-04-28T09:45:00Z',
    updatedAt: '2024-04-28T09:45:00Z',
  },
  {
    id: '12',
    name: 'Presentación Final - Comunicación Organizacional',
    subject: 'Comunicación',
    workType: 'presentacion',
    documentType: 'powerpoint',
    professor: 'Mtro. Sánchez Mora',
    university: 'Instituto Tecnológico Autónomo de México',
    semester: '2024-1',
    date: '2024-04-20',
    fileName: 'comunicacion_organizacional_final.pptx',
    fileSize: 6700000,
    tags: [DEFAULT_TAGS[1], DEFAULT_TAGS[3]],
    isTemplate: false,
    version: 1,
    createdAt: '2024-04-20T15:30:00Z',
    updatedAt: '2024-04-20T15:30:00Z',
  },
  {
    id: '13',
    name: 'Informe de Práctica - Circuitos Eléctricos',
    subject: 'Física',
    workType: 'informe',
    documentType: 'pdf',
    professor: 'Dra. López Herrera',
    university: 'Universidad Nacional Autónoma de México',
    semester: '2023-2',
    date: '2023-11-25',
    fileName: 'practica_circuitos_electricos.pdf',
    fileSize: 1900000,
    tags: [DEFAULT_TAGS[4], DEFAULT_TAGS[5]],
    isTemplate: true,
    version: 2,
    createdAt: '2023-11-25T11:20:00Z',
    updatedAt: '2023-12-01T10:00:00Z',
  },
  {
    id: '14',
    name: 'Proyecto Final - Sistema de Inventarios',
    subject: 'Programación',
    workType: 'proyecto',
    documentType: 'pdf',
    professor: 'Ing. Rodríguez Paz',
    university: 'Instituto Politécnico Nacional',
    semester: '2023-2',
    date: '2023-11-18',
    fileName: 'sistema_inventarios_final.pdf',
    fileSize: 4500000,
    tags: [DEFAULT_TAGS[0], DEFAULT_TAGS[1], DEFAULT_TAGS[3]],
    isTemplate: false,
    version: 1,
    createdAt: '2023-11-18T16:00:00Z',
    updatedAt: '2023-11-18T16:00:00Z',
  },
  {
    id: '15',
    name: 'Examen Final - Álgebra Lineal',
    subject: 'Matemáticas',
    workType: 'examen',
    documentType: 'pdf',
    professor: 'Dr. García López',
    university: 'Tecnológico de Monterrey',
    semester: '2023-2',
    date: '2023-12-05',
    fileName: 'examen_algebra_lineal.pdf',
    fileSize: 750000,
    tags: [DEFAULT_TAGS[1]],
    isTemplate: false,
    version: 1,
    createdAt: '2023-12-05T08:30:00Z',
    updatedAt: '2023-12-05T08:30:00Z',
  },
  {
    id: '16',
    name: 'Tarea - Normalización de Bases de Datos',
    subject: 'Base de Datos',
    workType: 'tarea',
    documentType: 'word',
    professor: 'Ing. Pérez Gómez',
    university: 'Universidad Autónoma Metropolitana',
    semester: '2023-2',
    date: '2023-10-30',
    fileName: 'tarea_normalizacion_bd.docx',
    fileSize: 420000,
    tags: [DEFAULT_TAGS[4]],
    isTemplate: false,
    version: 1,
    createdAt: '2023-10-30T14:15:00Z',
    updatedAt: '2023-10-30T14:15:00Z',
  },
  {
    id: '17',
    name: 'Análisis de Costos de Producción',
    subject: 'Economía',
    workType: 'informe',
    documentType: 'excel',
    professor: 'Mtro. Sánchez Mora',
    university: 'Universidad de Guadalajara',
    semester: '2023-1',
    date: '2023-05-12',
    fileName: 'analisis_costos_produccion.xlsx',
    fileSize: 980000,
    tags: [DEFAULT_TAGS[5]],
    isTemplate: false,
    version: 1,
    createdAt: '2023-05-12T10:00:00Z',
    updatedAt: '2023-05-12T10:00:00Z',
  },
  {
    id: '18',
    name: 'Ensayo Filosófico - Existencialismo',
    subject: 'Filosofía',
    workType: 'ensayo',
    documentType: 'pdf',
    professor: 'Dr. García López',
    university: 'Universidad Iberoamericana',
    semester: '2023-1',
    date: '2023-04-25',
    fileName: 'ensayo_existencialismo.pdf',
    fileSize: 380000,
    tags: [DEFAULT_TAGS[4], DEFAULT_TAGS[0]],
    isTemplate: false,
    version: 1,
    createdAt: '2023-04-25T09:00:00Z',
    updatedAt: '2023-04-25T09:00:00Z',
  },
  {
    id: '19',
    name: 'Presentación - Tabla Periódica Interactiva',
    subject: 'Química',
    workType: 'presentacion',
    documentType: 'powerpoint',
    professor: 'Dra. Martínez Ruiz',
    university: 'Instituto Tecnológico Autónomo de México',
    semester: '2023-1',
    date: '2023-03-18',
    fileName: 'tabla_periodica_interactiva.pptx',
    fileSize: 12500000,
    tags: [DEFAULT_TAGS[3], DEFAULT_TAGS[5]],
    isTemplate: false,
    version: 1,
    createdAt: '2023-03-18T13:45:00Z',
    updatedAt: '2023-03-18T13:45:00Z',
  },
  {
    id: '20',
    name: 'Proyecto - Aplicación Web con React',
    subject: 'Programación',
    workType: 'proyecto',
    documentType: 'pdf',
    professor: 'Ing. Rodríguez Paz',
    university: 'Universidad Nacional Autónoma de México',
    semester: '2023-1',
    date: '2023-05-30',
    fileName: 'proyecto_react_webapp.pdf',
    fileSize: 5800000,
    tags: [DEFAULT_TAGS[0], DEFAULT_TAGS[1], DEFAULT_TAGS[3]],
    isTemplate: true,
    version: 4,
    description: 'Documentación completa del proyecto de aplicación web con React',
    createdAt: '2023-05-30T17:00:00Z',
    updatedAt: '2024-02-15T11:30:00Z',
  },
];

export const getStatsFromWorks = (works: AcademicWork[]) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const subjects = new Set(works.map(w => w.subject));
  const semesters = new Set(works.map(w => w.semester));
  const professors = new Set(works.map(w => w.professor));

  const worksThisMonth = works.filter(w => {
    const date = new Date(w.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }).length;

  const templatesCount = works.filter(w => w.isTemplate).length;

  return {
    totalWorks: works.length,
    totalSubjects: subjects.size,
    totalSemesters: semesters.size,
    totalProfessors: professors.size,
    worksThisMonth,
    templatesCount,
  };
};

export const getWorksBySubject = (works: AcademicWork[]) => {
  const subjectCounts: Record<string, number> = {};
  works.forEach(work => {
    subjectCounts[work.subject] = (subjectCounts[work.subject] || 0) + 1;
  });

  return Object.entries(subjectCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getMonthlyTrend = (works: AcademicWork[]) => {
  const monthCounts: Record<string, number> = {};
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  works.forEach(work => {
    const date = new Date(work.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthCounts[key] = (monthCounts[key] || 0) + 1;
  });

  const sortedKeys = Object.keys(monthCounts).sort();
  return sortedKeys.slice(-12).map(key => {
    const [year, month] = key.split('-');
    return {
      month: `${months[parseInt(month) - 1]} ${year.slice(2)}`,
      count: monthCounts[key],
    };
  });
};

export const getWorksByType = (works: AcademicWork[]) => {
  const typeCounts: Record<string, number> = {};
  const typeLabels: Record<string, string> = {
    ensayo: 'Ensayo',
    informe: 'Informe',
    presentacion: 'Presentación',
    proyecto: 'Proyecto',
    tarea: 'Tarea',
    examen: 'Examen',
  };

  works.forEach(work => {
    typeCounts[work.workType] = (typeCounts[work.workType] || 0) + 1;
  });

  return Object.entries(typeCounts)
    .map(([type, value]) => ({ name: typeLabels[type] || type, value }))
    .sort((a, b) => b.value - a.value);
};
