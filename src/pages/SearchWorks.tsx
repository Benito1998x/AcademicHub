import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  X,
  LayoutGrid,
  List,
  Calendar,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { useWorks } from '@/context/WorksContext';
import { WorkCard } from '@/components/works/WorkCard';
import { WorksTable } from '@/components/works/WorksTable';
import { SUBJECTS, PROFESSORS, SEMESTERS } from '@/data/mockData';
import { WORK_TYPE_LABELS, DOCUMENT_TYPE_LABELS, WorkType, DocumentType } from '@/types/academic';
import { useToast } from '@/hooks/use-toast';

export default function SearchWorks() {
  const { filteredWorks, filters, setFilters, tags, toggleTemplate, deleteWork } = useWorks();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  const [showFilters, setShowFilters] = useState(false);

  // Autocomplete suggestions
  const suggestions = useMemo(() => {
    if (!searchInput || searchInput.length < 2) return [];

    const query = searchInput.toLowerCase();
    const allTerms = new Set<string>();

    filteredWorks.forEach((work) => {
      if (work.name.toLowerCase().includes(query)) allTerms.add(work.name);
      if (work.subject.toLowerCase().includes(query)) allTerms.add(work.subject);
      if (work.professor.toLowerCase().includes(query)) allTerms.add(work.professor);
      work.tags.forEach((tag) => {
        if (tag.name.toLowerCase().includes(query)) allTerms.add(tag.name);
      });
    });

    return Array.from(allTerms).slice(0, 5);
  }, [searchInput, filteredWorks]);

  const handleSearch = useCallback((value: string) => {
    setSearchInput(value);
    setFilters({ ...filters, searchQuery: value });
  }, [filters, setFilters]);

  const handleClearFilters = () => {
    setFilters({
      semester: '',
      subject: '',
      workType: '',
      documentType: '',
      professor: '',
      dateFrom: '',
      dateTo: '',
      searchQuery: '',
      tags: [],
    });
    setSearchInput('');
  };

  const handleToggleTemplate = (id: string) => {
    toggleTemplate(id);
    toast({
      title: 'Estado de plantilla actualizado',
      description: 'El trabajo ha sido actualizado.',
    });
  };

  const handleDelete = (id: string) => {
    deleteWork(id);
    toast({
      title: 'Trabajo eliminado',
      description: 'El trabajo se ha eliminado correctamente.',
      variant: 'destructive',
    });
  };

  const handleTagFilter = (tagId: string) => {
    const newTags = filters.tags.includes(tagId)
      ? filters.tags.filter((t) => t !== tagId)
      : [...filters.tags, tagId];
    setFilters({ ...filters, tags: newTags });
  };

  const activeFiltersCount = [
    filters.semester,
    filters.subject,
    filters.workType,
    filters.documentType,
    filters.professor,
    filters.dateFrom,
    filters.dateTo,
    ...filters.tags,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Buscar Trabajos</h1>
        <p className="text-muted-foreground mt-1">
          Encuentra tus trabajos académicos rápidamente
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar por nombre, materia, profesor..."
            className="pl-10 pr-10 h-12 bg-card shadow-soft"
          />
          {searchInput && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => handleSearch('')}
            >
              <X className="w-4 h-4" />
            </Button>
          )}

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {suggestions.length > 0 && searchInput.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-medium z-50 overflow-hidden"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2.5 text-left hover:bg-muted transition-colors flex items-center gap-2"
                    onClick={() => handleSearch(suggestion)}
                  >
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span>{suggestion}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-12 gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[320px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filtros Avanzados</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div>
                  <Label>Semestre</Label>
                  <Select
                    value={filters.semester}
                    onValueChange={(v) => setFilters({ ...filters, semester: v === 'all' ? '' : v })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Todos los semestres" />
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
                </div>

                <div>
                  <Label>Materia</Label>
                  <Select
                    value={filters.subject}
                    onValueChange={(v) => setFilters({ ...filters, subject: v === 'all' ? '' : v })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Todas las materias" />
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
                </div>

                <div>
                  <Label>Tipo de Trabajo</Label>
                  <Select
                    value={filters.workType}
                    onValueChange={(v) => setFilters({ ...filters, workType: v === 'all' ? '' : v as WorkType })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Todos los tipos" />
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
                </div>

                <div>
                  <Label>Formato</Label>
                  <Select
                    value={filters.documentType}
                    onValueChange={(v) => setFilters({ ...filters, documentType: v === 'all' ? '' : v as DocumentType })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Todos los formatos" />
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
                </div>

                <div>
                  <Label>Profesor</Label>
                  <Select
                    value={filters.professor}
                    onValueChange={(v) => setFilters({ ...filters, professor: v === 'all' ? '' : v })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Todos los profesores" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {PROFESSORS.map((prof) => (
                        <SelectItem key={prof} value={prof}>
                          {prof}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Desde</Label>
                    <Input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>Hasta</Label>
                    <Input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label>Etiquetas</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => handleTagFilter(tag.id)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          filters.tags.includes(tag.id) ? 'ring-2 ring-offset-2 ring-primary' : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: `${tag.color}20`,
                          color: tag.color,
                        }}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleClearFilters} variant="outline" className="flex-1">
                    Limpiar Todo
                  </Button>
                  <Button onClick={() => setShowFilters(false)} className="flex-1">
                    Aplicar
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="h-12 w-12 rounded-none"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
              className="h-12 w-12 rounded-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2"
        >
          {filters.semester && (
            <Badge variant="secondary" className="gap-1">
              Semestre: {filters.semester}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setFilters({ ...filters, semester: '' })}
              />
            </Badge>
          )}
          {filters.subject && (
            <Badge variant="secondary" className="gap-1">
              {filters.subject}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setFilters({ ...filters, subject: '' })}
              />
            </Badge>
          )}
          {filters.workType && (
            <Badge variant="secondary" className="gap-1">
              {WORK_TYPE_LABELS[filters.workType as WorkType]}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setFilters({ ...filters, workType: '' })}
              />
            </Badge>
          )}
          {filters.documentType && (
            <Badge variant="secondary" className="gap-1">
              {DOCUMENT_TYPE_LABELS[filters.documentType as DocumentType]}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setFilters({ ...filters, documentType: '' })}
              />
            </Badge>
          )}
          {filters.professor && (
            <Badge variant="secondary" className="gap-1">
              {filters.professor}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setFilters({ ...filters, professor: '' })}
              />
            </Badge>
          )}
          {filters.tags.map((tagId) => {
            const tag = tags.find((t) => t.id === tagId);
            return tag ? (
              <Badge
                key={tagId}
                variant="secondary"
                className="gap-1"
                style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
              >
                {tag.name}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleTagFilter(tagId)}
                />
              </Badge>
            ) : null;
          })}
        </motion.div>
      )}

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {filteredWorks.length} {filteredWorks.length === 1 ? 'resultado' : 'resultados'}
          {filters.searchQuery && ` para "${filters.searchQuery}"`}
        </p>
      </div>

      {/* Results */}
      {filteredWorks.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredWorks.map((work, index) => (
              <WorkCard
                key={work.id}
                work={work}
                onToggleTemplate={handleToggleTemplate}
                onDelete={handleDelete}
                delay={index * 0.03}
              />
            ))}
          </div>
        ) : (
          <WorksTable
            works={filteredWorks}
            onToggleTemplate={handleToggleTemplate}
            onDelete={handleDelete}
          />
        )
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-foreground mb-2">
            No se encontraron trabajos
          </h3>
          <p className="text-muted-foreground mb-4">
            {filters.searchQuery
              ? `No hay resultados para "${filters.searchQuery}"`
              : 'Intenta ajustar los filtros de búsqueda'}
          </p>
          <Button variant="outline" onClick={handleClearFilters}>
            Limpiar filtros
          </Button>
        </motion.div>
      )}
    </div>
  );
}
