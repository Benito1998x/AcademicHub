import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SEMESTERS, SUBJECTS } from '@/data/mockData';
import { WORK_TYPE_LABELS, DOCUMENT_TYPE_LABELS, WorkType, DocumentType } from '@/types/academic';

interface QuickFiltersProps {
  semester: string;
  subject: string;
  workType: WorkType | '';
  documentType: DocumentType | '';
  onSemesterChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onWorkTypeChange: (value: string) => void;
  onDocumentTypeChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function QuickFilters({
  semester,
  subject,
  workType,
  documentType,
  onSemesterChange,
  onSubjectChange,
  onWorkTypeChange,
  onDocumentTypeChange,
  onClearFilters,
  hasActiveFilters,
}: QuickFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-wrap items-center gap-3"
    >
      <Select value={semester} onValueChange={onSemesterChange}>
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Semestre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {SEMESTERS.map((sem) => (
            <SelectItem key={sem} value={sem}>
              {sem}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={subject} onValueChange={onSubjectChange}>
        <SelectTrigger className="w-[160px] bg-card">
          <SelectValue placeholder="Materia" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {SUBJECTS.map((sub) => (
            <SelectItem key={sub} value={sub}>
              {sub}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={workType} onValueChange={onWorkTypeChange}>
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {Object.entries(WORK_TYPE_LABELS).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={documentType} onValueChange={onDocumentTypeChange}>
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Formato" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {Object.entries(DOCUMENT_TYPE_LABELS).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4 mr-1" />
          Limpiar
        </Button>
      )}
    </motion.div>
  );
}