// jest.config.js
process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'
process.env.PUBLIC_URL = ''
require('react-scripts/config/env')

const path = require('path')
const createJestConfig = require('react-scripts/scripts/utils/createJestConfig')

module.exports = {
 ...createJestConfig(
   relativePath => require.resolve(path.join('react-scripts', relativePath)),
   __dirname,
   false,
 ),
 ...{
   // Esperamos cobertura de todos los archivos js, jsx, ts y tsx.
   // Excluimos la cobertura de los mocks de MSW (opcional) y de los índices.
   collectCoverageFrom: [
     'src/**/*.{js,jsx,ts,tsx}',
     '!src/mocks/**',
     '!src/serviceWorker.js',
     '!**/index.js',
   ],
   // Imponemos un mínimo del 90% de cobertura en las diferentes categorías de prueba.
   coverageThreshold: {
     global: {
       branches: 90,
       functions: 90,
       lines: 90,
       statements: 90,
     },
   },
   // Esperamos recibir el resultado como texto en el terminal.
   coverageReporters: ['text'],
 },
}

