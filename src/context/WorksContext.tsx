import { createContext, useContext, useState, ReactNode } from 'react';
import { AcademicWork, FilterState, Tag } from '@/types/academic';
import { MOCK_WORKS, DEFAULT_TAGS, SUBJECTS, PROFESSORS, UNIVERSITIES } from '@/data/mockData';

interface WorksContextType {
  works: AcademicWork[];
  tags: Tag[];
  subjects: string[];
  professors: string[];
  universities: string[];
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  addWork: (work: Omit<AcademicWork, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateWork: (id: string, work: Partial<AcademicWork>) => void;
  deleteWork: (id: string) => void;
  toggleTemplate: (id: string) => void;
  addTag: (tag: Omit<Tag, 'id'>) => void;
  addSubject: (subject: string) => void;
  addProfessor: (professor: string) => void;
  addUniversity: (university: string) => void;
  filteredWorks: AcademicWork[];
}

const defaultFilters: FilterState = {
  semester: '',
  subject: '',
  workType: '',
  documentType: '',
  professor: '',
  dateFrom: '',
  dateTo: '',
  searchQuery: '',
  tags: [],
};

const WorksContext = createContext<WorksContextType | undefined>(undefined);

export function WorksProvider({ children }: { children: ReactNode }) {
  const [works, setWorks] = useState<AcademicWork[]>(MOCK_WORKS);
  const [tags, setTags] = useState<Tag[]>(DEFAULT_TAGS);
  const [subjects, setSubjects] = useState<string[]>(SUBJECTS);
  const [professors, setProfessors] = useState<string[]>(PROFESSORS);
  const [universities, setUniversities] = useState<string[]>(UNIVERSITIES);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const addWork = (work: Omit<AcademicWork, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newWork: AcademicWork = {
      ...work,
      id: `work-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setWorks(prev => [newWork, ...prev]);
  };

  const updateWork = (id: string, updates: Partial<AcademicWork>) => {
    setWorks(prev =>
      prev.map(work =>
        work.id === id
          ? { ...work, ...updates, updatedAt: new Date().toISOString() }
          : work
      )
    );
  };

  const deleteWork = (id: string) => {
    setWorks(prev => prev.filter(work => work.id !== id));
  };

  const toggleTemplate = (id: string) => {
    setWorks(prev =>
      prev.map(work =>
        work.id === id
          ? { ...work, isTemplate: !work.isTemplate, updatedAt: new Date().toISOString() }
          : work
      )
    );
  };

  const addTag = (tag: Omit<Tag, 'id'>) => {
    const newTag: Tag = {
      ...tag,
      id: `tag-${Date.now()}`,
    };
    setTags(prev => [...prev, newTag]);
  };

  const addSubject = (subject: string) => {
    if (!subjects.includes(subject)) {
      setSubjects(prev => [...prev, subject]);
    }
  };

  const addProfessor = (professor: string) => {
    if (!professors.includes(professor)) {
      setProfessors(prev => [...prev, professor]);
    }
  };

  const addUniversity = (university: string) => {
    if (!universities.includes(university)) {
      setUniversities(prev => [...prev, university]);
    }
  };

  const filteredWorks = works.filter(work => {
    if (filters.semester && work.semester !== filters.semester) return false;
    if (filters.subject && work.subject !== filters.subject) return false;
    if (filters.workType && work.workType !== filters.workType) return false;
    if (filters.documentType && work.documentType !== filters.documentType) return false;
    if (filters.professor && work.professor !== filters.professor) return false;
    
    if (filters.dateFrom) {
      const workDate = new Date(work.date);
      const fromDate = new Date(filters.dateFrom);
      if (workDate < fromDate) return false;
    }
    
    if (filters.dateTo) {
      const workDate = new Date(work.date);
      const toDate = new Date(filters.dateTo);
      if (workDate > toDate) return false;
    }

    if (filters.tags.length > 0) {
      const workTagIds = work.tags.map(t => t.id);
      if (!filters.tags.some(tagId => workTagIds.includes(tagId))) return false;
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchable = [
        work.name,
        work.subject,
        work.professor,
        work.university,
        work.description || '',
        ...work.tags.map(t => t.name),
      ].join(' ').toLowerCase();
      
      if (!searchable.includes(query)) return false;
    }

    return true;
  });

  return (
    <WorksContext.Provider
      value={{
        works,
        tags,
        subjects,
        professors,
        universities,
        filters,
        setFilters,
        addWork,
        updateWork,
        deleteWork,
        toggleTemplate,
        addTag,
        addSubject,
        addProfessor,
        addUniversity,
        filteredWorks,
      }}
    >
      {children}
    </WorksContext.Provider>
  );
}

export function useWorks() {
  const context = useContext(WorksContext);
  if (context === undefined) {
    throw new Error('useWorks must be used within a WorksProvider');
  }
  return context;
}
