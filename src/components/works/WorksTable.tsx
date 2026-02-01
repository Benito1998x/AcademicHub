import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Star,
  MoreHorizontal,
  Eye,
  Download,
  Trash2,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

interface WorksTableProps {
  works: AcademicWork[];
  onToggleTemplate?: (id: string) => void;
  onDelete?: (id: string) => void;
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

export function WorksTable({ works, onToggleTemplate, onDelete }: WorksTableProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="rounded-lg border bg-card shadow-soft overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[40px]"></TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Materia</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Profesor</TableHead>
            <TableHead>Semestre</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Tamaño</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {works.map((work) => {
            const Icon = documentIcons[work.documentType] || File;
            const iconColor = documentColors[work.documentType];

            return (
              <TableRow key={work.id} className="group">
                <TableCell>
                  <div className={cn('w-8 h-8 rounded flex items-center justify-center bg-muted', iconColor)}>
                    <Icon className="w-4 h-4" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate max-w-[200px]">{work.name}</span>
                    {work.isTemplate && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                        </TooltipTrigger>
                        <TooltipContent>Plantilla</TooltipContent>
                      </Tooltip>
                    )}
                    {work.version > 1 && (
                      <Badge variant="outline" className="text-xs h-5">
                        v{work.version}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{work.subject}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {WORK_TYPE_LABELS[work.workType]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{work.professor}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {work.semester}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(work.date), 'dd/MM/yyyy', { locale: es })}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatFileSize(work.fileSize)}
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
