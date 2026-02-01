import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Palette, Bell, Database, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useWorks } from '@/context/WorksContext';

export default function Settings() {
  const { toast } = useToast();
  const { works } = useWorks();

  const handleSave = () => {
    toast({
      title: 'Configuración guardada',
      description: 'Los cambios han sido aplicados correctamente.',
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground mt-1">
          Personaliza tu experiencia en AcademicHub
        </p>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Apariencia
            </CardTitle>
            <CardDescription>
              Configura cómo se ve la aplicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="animations">Animaciones</Label>
                <p className="text-sm text-muted-foreground">
                  Habilitar animaciones de transición
                </p>
              </div>
              <Switch id="animations" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="compact">Vista compacta</Label>
                <p className="text-sm text-muted-foreground">
                  Reducir espaciado entre elementos
                </p>
              </div>
              <Switch id="compact" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificaciones
            </CardTitle>
            <CardDescription>
              Configura las alertas y notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="confirmations">Confirmaciones</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar mensaje al guardar o eliminar
                </p>
              </div>
              <Switch id="confirmations" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sounds">Sonidos</Label>
                <p className="text-sm text-muted-foreground">
                  Reproducir sonido en acciones
                </p>
              </div>
              <Switch id="sounds" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Datos
            </CardTitle>
            <CardDescription>
              Información sobre tus datos almacenados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-2xl font-bold">{works.length}</p>
                <p className="text-sm text-muted-foreground">Trabajos cargados</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-2xl font-bold">{works.filter((w) => w.isTemplate).length}</p>
                <p className="text-sm text-muted-foreground">Plantillas</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Los datos se almacenan localmente en esta sesión. Al recargar la página, se restaurarán los datos de ejemplo.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Acerca de
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Versión</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Desarrollado con</span>
              <span className="font-medium">React + TypeScript</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">UI</span>
              <span className="font-medium">Tailwind CSS + shadcn/ui</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex justify-end"
      >
        <Button onClick={handleSave} className="shadow-primary">
          Guardar Cambios
        </Button>
      </motion.div>
    </div>
  );
}
