export type DocumentType = 'pdf' | 'word' | 'excel' | 'powerpoint';
export type WorkType = 'ensayo' | 'informe' | 'presentacion' | 'proyecto' | 'tarea' | 'examen';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface AcademicWork {
  id: string;
  name: string;
  subject: string;
  workType: WorkType;
  documentType: DocumentType;
  professor: string;
  university: string;
  semester: string;
  date: string;
  fileName: string;
  fileSize: number;
  tags: Tag[];
  isTemplate: boolean;
  version: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  semester: string;
  subject: string;
  workType: WorkType | '';
  documentType: DocumentType | '';
  professor: string;
  dateFrom: string;
  dateTo: string;
  searchQuery: string;
  tags: string[];
}

export interface StatsData {
  totalWorks: number;
  totalSubjects: number;
  totalSemesters: number;
  totalProfessors: number;
  worksThisMonth: number;
  templatesCount: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

export interface MonthlyTrendData {
  month: string;
  count: number;
}

export const WORK_TYPE_LABELS: Record<WorkType, string> = {
  ensayo: 'Ensayo',
  informe: 'Informe',
  presentacion: 'Presentación',
  proyecto: 'Proyecto',
  tarea: 'Tarea',
  examen: 'Examen',
};

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  pdf: 'PDF',
  word: 'Word',
  excel: 'Excel',
  powerpoint: 'PowerPoint',
};

export const DOCUMENT_TYPE_EXTENSIONS: Record<DocumentType, string> = {
  pdf: '.pdf',
  word: '.docx',
  excel: '.xlsx',
  powerpoint: '.pptx',
};

export const DOCUMENT_TYPE_COLORS: Record<DocumentType, string> = {
  pdf: 'hsl(0, 84%, 60%)',
  word: 'hsl(210, 100%, 40%)',
  excel: 'hsl(142, 76%, 36%)',
  powerpoint: 'hsl(25, 95%, 53%)',
};
