# 29-IS2-ttito-surco

**Estudiante:** Ttito Surco
**Ficha:** 29 — Eliminar registros devueltos
**Curso:** Ingeniería de Software II

## Mejora implementada

**Nombre:** Eliminación protegida de registros devueltos

Se agregó un botón rojo "🗑️ Eliminar registros devueltos" en la sección de préstamos registrados. Al hacer clic, el sistema solicita confirmación antes de proceder. Si el usuario confirma, se eliminan únicamente los registros con estado "Devuelto"; los préstamos activos no se ven afectados. Si el usuario cancela, no se elimina ningún registro.

## Criterios de aceptación

- Al confirmar, se eliminan únicamente los registros con estado Devuelto.
- Al cancelar, no se elimina ningún registro.
- Los préstamos con estado Activo nunca son eliminados por esta acción.
- Si no hay registros devueltos, se muestra un aviso informativo.

## Inicio rápido

1. Abrir `index.html` en el navegador o acceder a la URL de GitHub Pages.
2. Usar "Restablecer datos de ejemplo" para cargar datos de prueba.
3. Marcar un préstamo como devuelto con el botón "Devolver".
4. Hacer clic en "🗑️ Eliminar registros devueltos" para probar la mejora.

## Archivos principales

- `index.html` — estructura e interfaz de la aplicación.
- `style.css` — diseño visual.
- `app.js` — lógica, validaciones y almacenamiento local.

## Casos de prueba de mi mejora

| Caso | Datos de entrada / acción | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|
| CP-01: válido | Existen préstamos con estado "Devuelto" y al menos uno "Activo". Acción: hacer clic en "🗑️ Eliminar registros devueltos" y confirmar en el cuadro de diálogo. | El sistema elimina únicamente los registros con estado "Devuelto" sin pedir confirmación adicional. Los préstamos activos permanecen visibles en la tabla y el contador de activos no cambia. | Se eliminaron solo los registros devueltos. El préstamo activo permaneció en la tabla y el contador de activos no varió. | Aprobado |
| CP-02: cancelación | Existen préstamos con estado "Devuelto". Acción: hacer clic en "🗑️ Eliminar registros devueltos" y cancelar en el cuadro de diálogo. | El sistema no elimina ningún registro. La tabla mantiene todos los registros sin cambios. | Al cancelar, la tabla no sufrió ningún cambio. Todos los registros devueltos permanecieron intactos. | Aprobado |

## Entrega

- **Repositorio:** https://github.com/dayluna0107/29-IS2-ttito-surco
- **GitHub Pages:** https://dayluna0107.github.io/29-IS2-ttito-surco
