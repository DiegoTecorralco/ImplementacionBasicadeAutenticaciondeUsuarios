
# Flujo de Trabajo con Git - Fusión `--no-ff` y Limpieza de Ramas

## 📋 Descripción
Este documento describe el proceso completo para trabajar con ramas en Git, fusionar usando `--no-ff` (no fast-forward) y eliminar las ramas una vez fusionadas.

## Flujo Completo

### 1. Verificar ramas actuales
```bash
git branch
```
**Salida esperada:**
```
* funcionesJS
  main
```

### 2. Añadir cambios al área de staging
```bash
git add .
```

### 3. Confirmar los cambios (commit)
```bash
git commit -m "Descripción clara de los cambios realizados"
```
**Ejemplo:**
```bash
git commit -m "FuncionesJs arregladas y terminadas"
```

### 4. Subir la rama al repositorio remoto
```bash
git push
```
**Salida esperada:**
```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
...
To https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   d2eb4bf..7c4d576  funcionesJS -> funcionesJS
```

### 5. Cambiar a la rama principal (main)
```bash
git checkout main
```
**Salida esperada:**
```
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
```

### 6. Fusionar con `--no-ff` (creando commit de fusión)
```bash
git merge --no-ff -m "Mensaje descriptivo del merge" nombre-de-la-rama
```
**Ejemplo:**
```bash
git merge --no-ff -m "fusiones terminadas y fusión de la rama" funcionesJS
```
**Salida esperada:**
```
Merge made by the 'ort' strategy.
 archivo1.ext |   10 ++++++++++
 archivo2.ext |    5 +++++
 2 files changed, 15 insertions(+)
 create mode 100644 nuevo-archivo.ext
```

### 7. Subir los cambios de main al remoto
```bash
git push
```
**Salida esperada:**
```
Enumerating objects: 1, done.
Counting objects: 100% (1/1), done.
...
To https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   7198f6b..359625b  main -> main
```

### 8. Eliminar la rama local (ya fusionada)
```bash
git branch -d nombre-de-la-rama
```
**Ejemplo:**
```bash
git branch -d funcionesJS
```
> **Nota:** La opción `-d` es segura; solo elimina si la rama ya fue fusionada.

### 9. Eliminar la rama remota (opcional pero recomendado)
```bash
git push origin --delete nombre-de-la-rama
```
**Ejemplo:**
```bash
git push origin --delete funcionesJS
```

### 10. Verificar el estado final
```bash
git branch
```
**Salida esperada:**
```
* main
```

## 📊 Tabla Resumen de Comandos

| Paso | Acción | Comando |
|------|--------|---------|
| 1 | Ver ramas | `git branch` |
| 2 | Añadir cambios | `git add .` |
| 3 | Commit | `git commit -m "mensaje"` |
| 4 | Push rama | `git push` |
| 5 | Cambiar a main | `git checkout main` |
| 6 | Fusionar con `--no-ff` | `git merge --no-ff -m "mensaje" rama` |
| 7 | Push main | `git push` |
| 8 | Eliminar rama local | `git branch -d rama` |
| 9 | Eliminar rama remota | `git push origin --delete rama` |
| 10 | Verificar | `git branch` |

## 🎯 Beneficios de usar `--no-ff`

- **Historial más claro:** Se ve exactamente dónde comenzó y terminó una funcionalidad
- **Mejor contexto:** El commit de fusión agrupa todos los cambios de la rama
- **Revertir más fácil:** Puedes deshacer toda una funcionalidad con un solo comando
- **Trazabilidad:** Queda registro visual de las ramas en el historial

## ⚠️ Notas importantes

- Siempre hacer `git pull` en `main` antes de empezar a trabajar
- Los mensajes de commit deben ser descriptivos y en español o inglés (consistente)
- Eliminar ramas mantiene el repositorio limpio y organizado
- La rama `main` nunca se elimina (es la rama principal)

## 📝 Comandos útiles adicionales

```bash
# Ver todas las ramas (locales y remotas)
git branch -a

# Ver el gráfico del historial (útil para ver los merges)
git log --graph --oneline --decorate

# Traer cambios del remoto sin fusionar
git fetch

# Ver diferencias entre ramas
git diff main..funcionesJS
```

## 🏁 Flujo resumido (para copiar y pegar)

```bash
# 1. Trabajar en tu rama
git add .
git commit -m "descripción"
git push

# 2. Fusionar en main
git checkout main
git merge --no-ff -m "fusión completada" nombre-rama
git push

# 3. Limpiar
git branch -d nombre-rama
git push origin --delete nombre-rama
```

