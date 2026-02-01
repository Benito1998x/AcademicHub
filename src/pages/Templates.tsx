import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, FileStack, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWorks } from '@/context/WorksContext';
import { WorkCard } from '@/components/works/WorkCard';
import { useToast } from '@/hooks/use-toast';

export default function Templates() {
  const { works, toggleTemplate, deleteWork } = useWorks();
  const { toast } = useToast();

  const templates = useMemo(() => works.filter((w) => w.isTemplate), [works]);

  const handleToggleTemplate = (id: string) => {
    toggleTemplate(id);
    toast({
      title: 'Plantilla removida',
      description: 'El trabajo ya no es una plantilla reutilizable.',
    });
  };

  const handleDelete = (id: string) => {
    deleteWork(id);
    toast({
      title: 'Plantilla eliminada',
      description: 'La plantilla se ha eliminado correctamente.',
      variant: 'destructive',
    });
  };

  // Group templates by subject
  const templatesBySubject = useMemo(() => {
    const grouped: Record<string, typeof templates> = {};
    templates.forEach((template) => {
      if (!grouped[template.subject]) {
        grouped[template.subject] = [];
      }
      grouped[template.subject].push(template);
    });
    return grouped;
  }, [templates]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Plantillas</h1>
        <p className="text-muted-foreground mt-1">
          Trabajos reutilizables con control de versiones
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="shadow-soft bg-gradient-to-br from-warning/10 to-warning/5">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Plantillas</p>
                <p className="text-2xl font-bold">{templates.length}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Card className="shadow-soft">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <FileStack className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Materias</p>
                <p className="text-2xl font-bold">{Object.keys(templatesBySubject).length}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="shadow-soft">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Con Versiones</p>
                <p className="text-2xl font-bold">
                  {templates.filter((t) => t.version > 1).length}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Templates by Subject */}
      {templates.length > 0 ? (
        Object.entries(templatesBySubject).map(([subject, subjectTemplates], groupIndex) => (
          <motion.div
            key={subject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + groupIndex * 0.1 }}
          >
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {subject}
                    <Badge variant="secondary">{subjectTemplates.length}</Badge>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {subjectTemplates.map((template, index) => (
                    <WorkCard
                      key={template.id}
                      work={template}
                      onToggleTemplate={handleToggleTemplate}
                      onDelete={handleDelete}
                      delay={index * 0.05}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-foreground mb-2">
            No tienes plantillas aún
          </h3>
          <p className="text-muted-foreground">
            Marca cualquier trabajo como plantilla para verlo aquí
          </p>
        </motion.div>
      )}
    </div>
  );
}
