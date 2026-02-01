import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  X,
  Sparkles,
  Check,
  Plus,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ComboboxWithAdd } from '@/components/ui/combobox-with-add';
import { useWorks } from '@/context/WorksContext';
import { useToast } from '@/hooks/use-toast';
import { SEMESTERS } from '@/data/mockData';
import { DocumentType, WorkType, WORK_TYPE_LABELS, DOCUMENT_TYPE_LABELS, Tag } from '@/types/academic';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  subject: string;
  workType: WorkType | '';
  documentType: DocumentType | '';
  professor: string;
  university: string;
  semester: string;
  date: string;
  description: string;
  fileName: string;
  fileSize: number;
}

const initialFormData: FormData = {
  name: '',
  subject: '',
  workType: '',
  documentType: '',
  professor: '',
  university: '',
  semester: '',
  date: '',
  description: '',
  fileName: '',
  fileSize: 0,
};

export default function UploadWork() {
  const navigate = useNavigate();
  const { addWork, tags, subjects, professors, universities, addSubject, addProfessor, addUniversity } = useWorks();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showPreview, setShowPreview] = useState(false);

  const documentIcons: Record<DocumentType, typeof FileText> = {
    pdf: FileText,
    word: FileText,
    excel: FileSpreadsheet,
    powerpoint: FileImage,
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.subject) newErrors.subject = 'La materia es requerida';
    if (!formData.workType) newErrors.workType = 'El tipo de trabajo es requerido';
    if (!formData.documentType) newErrors.documentType = 'El formato es requerido';
    if (!formData.professor) newErrors.professor = 'El profesor es requerido';
    if (!formData.university) newErrors.university = 'La universidad es requerida';
    if (!formData.semester) newErrors.semester = 'El semestre es requerido';
    if (!formData.date) newErrors.date = 'La fecha es requerida';
    if (!formData.fileName) newErrors.fileName = 'Debes subir un archivo';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const extractMetadataFromFileName = (fileName: string) => {
    const cleanName = fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ').replace(/-/g, ' ');
    
    const foundSubject = subjects.find((s) =>
      cleanName.toLowerCase().includes(s.toLowerCase())
    );

    const typeKeywords: Record<WorkType, string[]> = {
      ensayo: ['ensayo', 'essay'],
      informe: ['informe', 'reporte', 'report'],
      presentacion: ['presentacion', 'ppt', 'slides'],
      proyecto: ['proyecto', 'project', 'final'],
      tarea: ['tarea', 'homework', 'ejercicio'],
      examen: ['examen', 'parcial', 'final', 'quiz'],
    };

    let detectedType: WorkType | '' = '';
    for (const [type, keywords] of Object.entries(typeKeywords)) {
      if (keywords.some((kw) => cleanName.toLowerCase().includes(kw))) {
        detectedType = type as WorkType;
        break;
      }
    }

    const extension = fileName.split('.').pop()?.toLowerCase();
    let documentType: DocumentType | '' = '';
    if (extension === 'pdf') documentType = 'pdf';
    else if (['doc', 'docx'].includes(extension || '')) documentType = 'word';
    else if (['xls', 'xlsx'].includes(extension || '')) documentType = 'excel';
    else if (['ppt', 'pptx'].includes(extension || '')) documentType = 'powerpoint';

    setFormData((prev) => ({
      ...prev,
      name: prev.name || cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
      subject: prev.subject || foundSubject || '',
      workType: prev.workType || detectedType,
      documentType: prev.documentType || documentType,
    }));

    toast({
      title: 'Metadatos extraídos',
      description: 'Se han extraído automáticamente algunos datos del archivo.',
    });
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        fileName: file.name,
        fileSize: file.size,
      }));
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        fileName: file.name,
        fileSize: file.size,
      }));
    }
  };

  const handleTagToggle = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.some((t) => t.id === tag.id)
        ? prev.filter((t) => t.id !== tag.id)
        : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Error de validación',
        description: 'Por favor completa todos los campos requeridos.',
        variant: 'destructive',
      });
      return;
    }

    addWork({
      name: formData.name,
      subject: formData.subject,
      workType: formData.workType as WorkType,
      documentType: formData.documentType as DocumentType,
      professor: formData.professor,
      university: formData.university,
      semester: formData.semester,
      date: formData.date,
      fileName: formData.fileName,
      fileSize: formData.fileSize,
      description: formData.description,
      tags: selectedTags,
      isTemplate: false,
      version: 1,
    });

    toast({
      title: 'Trabajo cargado',
      description: 'El trabajo se ha guardado correctamente.',
    });

    navigate('/');
  };

  const handleShowPreview = () => {
    if (validateForm()) {
      setShowPreview(true);
    }
  };

  const Icon = formData.documentType
    ? documentIcons[formData.documentType as DocumentType]
    : File;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Cargar Trabajo</h1>
        <p className="text-muted-foreground mt-1">
          Agrega un nuevo trabajo académico a tu biblioteca
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Información del Trabajo</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Drag & Drop Area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    'drag-area p-8 text-center cursor-pointer transition-all',
                    isDragging && 'dragging',
                    errors.fileName && 'border-destructive'
                  )}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    onChange={handleFileSelect}
                  />
                  {formData.fileName ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">{formData.fileName}</p>
                        <p className="text-sm text-muted-foreground">
                          {(formData.fileSize / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData((prev) => ({ ...prev, fileName: '', fileSize: 0 }));
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="font-medium text-foreground mb-1">
                        Arrastra tu archivo aquí
                      </p>
                      <p className="text-sm text-muted-foreground">
                        o haz clic para seleccionar (PDF, Word, Excel, PowerPoint)
                      </p>
                    </>
                  )}
                </div>

                {formData.fileName && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => extractMetadataFromFileName(formData.fileName)}
                    className="w-full"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Extraer metadatos automáticamente
                  </Button>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Nombre del trabajo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Ej: Análisis de Algoritmos de Ordenamiento"
                      className={cn(errors.name && 'border-destructive')}
                    />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label>Materia *</Label>
                    <ComboboxWithAdd
                      options={subjects}
                      value={formData.subject}
                      onValueChange={(v) => setFormData((prev) => ({ ...prev, subject: v }))}
                      onAddNew={addSubject}
                      placeholder="Selecciona una materia"
                      searchPlaceholder="Buscar materia..."
                      addNewLabel="Agregar nueva materia"
                      dialogTitle="Agregar nueva materia"
                      dialogInputLabel="Nombre de la materia"
                      error={!!errors.subject}
                    />
                    {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <Label>Tipo de trabajo *</Label>
                    <Select
                      value={formData.workType}
                      onValueChange={(v) => setFormData((prev) => ({ ...prev, workType: v as WorkType }))}
                    >
                      <SelectTrigger className={cn(errors.workType && 'border-destructive')}>
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(WORK_TYPE_LABELS).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.workType && <p className="text-sm text-destructive mt-1">{errors.workType}</p>}
                  </div>

                  <div>
                    <Label>Formato del documento *</Label>
                    <Select
                      value={formData.documentType}
                      onValueChange={(v) => setFormData((prev) => ({ ...prev, documentType: v as DocumentType }))}
                    >
                      <SelectTrigger className={cn(errors.documentType && 'border-destructive')}>
                        <SelectValue placeholder="Selecciona el formato" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(DOCUMENT_TYPE_LABELS).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.documentType && <p className="text-sm text-destructive mt-1">{errors.documentType}</p>}
                  </div>

                  <div>
                    <Label>Profesor *</Label>
                    <ComboboxWithAdd
                      options={professors}
                      value={formData.professor}
                      onValueChange={(v) => setFormData((prev) => ({ ...prev, professor: v }))}
                      onAddNew={addProfessor}
                      placeholder="Selecciona el profesor"
                      searchPlaceholder="Buscar profesor..."
                      addNewLabel="Agregar nuevo profesor"
                      dialogTitle="Agregar nuevo profesor"
                      dialogInputLabel="Nombre del profesor"
                      error={!!errors.professor}
                    />
                    {errors.professor && <p className="text-sm text-destructive mt-1">{errors.professor}</p>}
                  </div>

                  <div>
                    <Label>Universidad *</Label>
                    <ComboboxWithAdd
                      options={universities}
                      value={formData.university}
                      onValueChange={(v) => setFormData((prev) => ({ ...prev, university: v }))}
                      onAddNew={addUniversity}
                      placeholder="Selecciona la universidad"
                      searchPlaceholder="Buscar universidad..."
                      addNewLabel="Agregar nueva universidad"
                      dialogTitle="Agregar nueva universidad"
                      dialogInputLabel="Nombre de la universidad"
                      error={!!errors.university}
                    />
                    {errors.university && <p className="text-sm text-destructive mt-1">{errors.university}</p>}
                  </div>

                  <div>
                    <Label>Semestre *</Label>
                    <Select
                      value={formData.semester}
                      onValueChange={(v) => setFormData((prev) => ({ ...prev, semester: v }))}
                    >
                      <SelectTrigger className={cn(errors.semester && 'border-destructive')}>
                        <SelectValue placeholder="Selecciona el semestre" />
                      </SelectTrigger>
                      <SelectContent>
                        {SEMESTERS.map((semester) => (
                          <SelectItem key={semester} value={semester}>
                            {semester}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.semester && <p className="text-sm text-destructive mt-1">{errors.semester}</p>}
                  </div>

                  <div>
                    <Label htmlFor="date">Fecha *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                      className={cn(errors.date && 'border-destructive')}
                    />
                    {errors.date && <p className="text-sm text-destructive mt-1">{errors.date}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Descripción (opcional)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Agrega una descripción del trabajo..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <Label>Etiquetas</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-sm font-medium transition-all border-2',
                          selectedTags.some((t) => t.id === tag.id)
                            ? 'ring-2 ring-offset-2 ring-primary'
                            : 'opacity-70 hover:opacity-100 border-transparent'
                        )}
                        style={{
                          backgroundColor: `${tag.color}20`,
                          color: tag.color,
                        }}
                      >
                        {selectedTags.some((t) => t.id === tag.id) && (
                          <Check className="w-3 h-3 inline mr-1" />
                        )}
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 shadow-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Guardar Trabajo
                  </Button>
                  <Button type="button" variant="outline" onClick={handleShowPreview}>
                    Vista Previa
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="shadow-soft sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Vista Previa</CardTitle>
            </CardHeader>
            <CardContent>
              {showPreview && formData.name ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {formData.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.subject || 'Sin materia'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo:</span>
                      <Badge variant="secondary">
                        {formData.workType
                          ? WORK_TYPE_LABELS[formData.workType as WorkType]
                          : '-'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Formato:</span>
                      <Badge variant="outline">
                        {formData.documentType
                          ? DOCUMENT_TYPE_LABELS[formData.documentType as DocumentType]
                          : '-'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profesor:</span>
                      <span className="font-medium">{formData.professor || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Universidad:</span>
                      <span className="font-medium text-right max-w-[150px] truncate">{formData.university || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Semestre:</span>
                      <span className="font-medium">{formData.semester || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha:</span>
                      <span className="font-medium">{formData.date || '-'}</span>
                    </div>
                  </div>

                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTags.map((tag) => (
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
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Completa el formulario para ver la vista previa</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
