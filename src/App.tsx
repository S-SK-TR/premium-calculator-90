import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AppShell } from './core/components/layout/AppShell'
import { StoreProvider } from './core/store/store-context'
import { BasicCalculator } from './features/basic-calculator/BasicCalculator'
import { ScientificCalculator } from './features/scientific-calculator/ScientificCalculator'
import { History } from './features/history/History'
import { UnitConverter } from './features/unit-converter/UnitConverter'
import { Graph } from './features/graph/Graph'

// Animasyon varyantları
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
}

function App() {
  const location = useLocation()

  return (
    <StoreProvider>
      <AppShell>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={<Navigate to="/calculator" replace />}
            />
            <Route
              path="/calculator"
              element={(
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <BasicCalculator />
                </motion.div>
              )}
            />
            <Route
              path="/scientific-calculator"
              element={(
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ScientificCalculator />
                </motion.div>
              )}
            />
            <Route
              path="/history"
              element={(
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <History />
                </motion.div>
              )}
            />
            <Route
              path="/unit-converter"
              element={(
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <UnitConverter />
                </motion.div>
              )}
            />
            <Route
              path="/graph"
              element={(
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Graph />
                </motion.div>
              )}
            />
            <Route
              path="*"
              element={<Navigate to="/calculator" replace />}
            />
          </Routes>
        </AnimatePresence>
      </AppShell>
    </StoreProvider>
  )
}

export default App