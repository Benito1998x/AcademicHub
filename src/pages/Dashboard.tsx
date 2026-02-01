import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FileStack, BookOpen, Calendar, Users, TrendingUp, Star, LayoutGrid, List } from 'lucide-react';
import { useWorks } from '@/context/WorksContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { SubjectBarChart, TrendLineChart, TypePieChart } from '@/components/dashboard/Charts';
import { QuickFilters } from '@/components/dashboard/QuickFilters';
import { WorkCard } from '@/components/works/WorkCard';
import { WorksTable } from '@/components/works/WorksTable';
import { Button } from '@/components/ui/button';
import { getStatsFromWorks, getWorksBySubject, getMonthlyTrend, getWorksByType } from '@/data/mockData';
import { WorkType, DocumentType } from '@/types/academic';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const { works, filteredWorks, filters, setFilters, toggleTemplate, deleteWork } = useWorks();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = useMemo(() => getStatsFromWorks(works), [works]);
  const subjectData = useMemo(() => getWorksBySubject(works), [works]);
  const trendData = useMemo(() => getMonthlyTrend(works), [works]);
  const typeData = useMemo(() => getWorksByType(works), [works]);

  const hasActiveFilters =
    filters.semester !== '' ||
    filters.subject !== '' ||
    filters.workType !== '' ||
    filters.documentType !== '';

  const handleClearFilters = () => {
    setFilters({
      ...filters,
      semester: '',
      subject: '',
      workType: '',
      documentType: '',
    });
  };

  const handleToggleTemplate = (id: string) => {
    toggleTemplate(id);
    const work = works.find((w) => w.id === id);
    toast({
      title: work?.isTemplate ? 'Plantilla removida' : 'Plantilla creada',
      description: work?.isTemplate
        ? 'El trabajo ya no es una plantilla reutilizable.'
        : 'El trabajo ahora es una plantilla reutilizable.',
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

  const recentWorks = filteredWorks.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Resumen de tus trabajos académicos
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Trabajos"
          value={stats.totalWorks}
          icon={FileStack}
          variant="primary"
          delay={0}
        />
        <StatCard
          title="Materias"
          value={stats.totalSubjects}
          icon={BookOpen}
          delay={0.05}
        />
        <StatCard
          title="Semestres"
          value={stats.totalSemesters}
          icon={Calendar}
          delay={0.1}
        />
        <StatCard
          title="Profesores"
          value={stats.totalProfessors}
          icon={Users}
          delay={0.15}
        />
        <StatCard
          title="Este Mes"
          value={stats.worksThisMonth}
          icon={TrendingUp}
          variant="success"
          delay={0.2}
        />
        <StatCard
          title="Plantillas"
          value={stats.templatesCount}
          icon={Star}
          variant="warning"
          delay={0.25}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <SubjectBarChart data={subjectData} />
        <TrendLineChart data={trendData} />
        <TypePieChart data={typeData} />
      </div>

      {/* Recent Works Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-semibold text-foreground"
          >
            Trabajos Recientes
            {hasActiveFilters && (
              <span className="text-muted-foreground font-normal ml-2">
                ({filteredWorks.length} resultados)
              </span>
            )}
          </motion.h2>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="h-9 w-9"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
              className="h-9 w-9"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <QuickFilters
          semester={filters.semester}
          subject={filters.subject}
          workType={filters.workType}
          documentType={filters.documentType}
          onSemesterChange={(v) => setFilters({ ...filters, semester: v === 'all' ? '' : v })}
          onSubjectChange={(v) => setFilters({ ...filters, subject: v === 'all' ? '' : v })}
          onWorkTypeChange={(v) => setFilters({ ...filters, workType: v === 'all' ? '' : v as WorkType })}
          onDocumentTypeChange={(v) => setFilters({ ...filters, documentType: v === 'all' ? '' : v as DocumentType })}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Works Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {recentWorks.map((work, index) => (
              <WorkCard
                key={work.id}
                work={work}
                onToggleTemplate={handleToggleTemplate}
                onDelete={handleDelete}
                delay={index * 0.05}
              />
            ))}
          </div>
        ) : (
          <WorksTable
            works={recentWorks}
            onToggleTemplate={handleToggleTemplate}
            onDelete={handleDelete}
          />
        )}

        {filteredWorks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileStack className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">
              No se encontraron trabajos
            </h3>
            <p className="text-muted-foreground">
              Intenta ajustar los filtros o carga un nuevo trabajo.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
