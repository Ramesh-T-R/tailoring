import { useState } from 'react';

export const useSidebarLogic = () => {
  const [openConfig, setOpenConfig] = useState(true);
  const [openTailoring, setOpenTailoring] = useState(true);

  const toggleConfig = () => setOpenConfig(!openConfig);
  const toggleTailoring = () => setOpenTailoring(!openTailoring);

  return {
    openConfig,
    openTailoring,
    toggleConfig,
    toggleTailoring,
  };
};
