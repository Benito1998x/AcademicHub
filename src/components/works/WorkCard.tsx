import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  MoreHorizontal,
  Star,
  Eye,
  Download,
  Trash2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AcademicWork, WORK_TYPE_LABELS, DocumentType } from '@/types/academic';
import { cn } from '@/lib/utils';

interface WorkCardProps {
  work: AcademicWork;
  onToggleTemplate?: (id: string) => void;
  onDelete?: (id: string) => void;
  delay?: number;
}

const documentIcons: Record<DocumentType, typeof FileText> = {
  pdf: FileText,
  word: FileText,
  excel: FileSpreadsheet,
  powerpoint: FileImage,
};

const documentColors: Record<DocumentType, string> = {
  pdf: 'text-destructive',
  word: 'text-primary',
  excel: 'text-success',
  powerpoint: 'text-warning',
};

export function WorkCard({ work, onToggleTemplate, onDelete, delay = 0 }: WorkCardProps) {
  const Icon = documentIcons[work.documentType] || File;
  const iconColor = documentColors[work.documentType];

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="hover-lift shadow-soft group">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={cn('w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0', iconColor)}>
              <Icon className="w-6 h-6" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{work.name}</h3>
                    {work.isTemplate && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Star className="w-4 h-4 text-warning fill-warning flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent>Plantilla reutilizable</TooltipContent>
                      </Tooltip>
                    )}
                    {work.version > 1 && (
                      <Badge variant="outline" className="text-xs">
                        v{work.version}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {work.subject} • {work.professor}
                  </p>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onToggleTemplate?.(work.id)}>
                      <Star className="w-4 h-4 mr-2" />
                      {work.isTemplate ? 'Quitar de plantillas' : 'Marcar como plantilla'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onDelete?.(work.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge variant="secondary" className="text-xs font-normal">
                  {WORK_TYPE_LABELS[work.workType]}
                </Badge>
                <Badge variant="outline" className="text-xs font-normal">
                  {work.semester}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(work.date), "d 'de' MMMM, yyyy", { locale: es })}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(work.fileSize)}
                </span>
              </div>

              {/* Tags */}
              {work.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {work.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-2 py-0.5 text-xs rounded-full font-medium"
                      style={{
                        backgroundColor: `${tag.color}20`,
                        color: tag.color,
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
