# Web de la boda · Álvaro y Rocío

Viernes 30 de abril de 2027 · Finca Villa María, Las Rozas.

Página única, estática, sin dependencias ni proceso de compilación.
Se edita abriendo los archivos con cualquier editor de texto.

```
index.html          Todo el contenido de la página
assets/styles.css   Estilos y paleta
assets/main.js      Cuenta atrás, copiar cuenta, aparición al hacer scroll
assets/img/         Vuestras fotos (ver LEEME.txt dentro)
boda.ics            Archivo de calendario del botón "Guardar la fecha"
CNAME               Dominio personalizado. No borrar.
.nojekyll           Evita que GitHub procese la web. No borrar.
```

---

## Antes de publicar

Busca `TODO` en `index.html` y `main.js`. Son ocho cosas:

| Dónde | Qué falta |
|---|---|
| Historia | Escribir vuestros párrafos |
| El día | Confirmar las horas reales con la finca |
| Si vienes de fuera | Lista de hoteles cuando Paz la mande |
| Volver a casa | Teléfono del radiotaxi de la finca |
| Qué ponerse | Ajustar el código de vestimenta si queréis otro |
| Regalo | **Poner vuestro IBAN real** (en dos sitios: el `<code>` y el `data-copy` del botón) |
| Confirmar | **Pegar el enlace del formulario de Google** |
| main.js | Hora de la ceremonia para la cuenta atrás |
| assets/img/ | Las tres fotos, la de compartir y el favicon |

Sin el IBAN y el enlace del formulario la web no sirve de nada, así que
empezad por esos dos.

---

## El formulario de Google

Crea el formulario en el Drive con estos campos. El orden importa porque
es el que verá la gente:

1. **Nombre y apellidos** · texto corto · obligatorio
2. **¿Vienes?** · desplegable: Sí, allí estaré / No puedo · obligatorio
3. **Teléfono** · texto corto · obligatorio
4. **¿Vienes acompañado?** · desplegable: No / Sí, con una persona / Sí, con dos o más
5. **Nombre de tus acompañantes** · párrafo
6. **¿Cuántos son niños y qué edad tienen?** · texto corto
7. **Alergias, intolerancias o dieta especial** · párrafo
   → Añade el texto de ayuda: *"Dinos de quién es cada una. Si no hay ninguna, déjalo en blanco."*
8. **¿De dónde vienes?** · desplegable: Madrid / Canarias / Bilbao / Zaragoza / Otro
9. **¿Necesitas hotel?** · Sí / No
10. **¿Algo que quieras contarnos?** · párrafo

En los ajustes del formulario, activa **"Enviar copia de la respuesta"**
y **desactiva** la recogida de correos si no la necesitas.

Luego pulsa *Enviar → enlace → acortar URL* y pega esa dirección en
`index.html`, buscando `https://forms.gle/PENDIENTE`.

Las respuestas van a una hoja de cálculo de vuestro Drive. Esa hoja es
privada y nunca debe subirse a GitHub.

---

## Publicar en GitHub Pages

1. Crea un repositorio **público** en GitHub. Sube estos archivos a la raíz,
   no dentro de una carpeta.
2. En *Settings → Pages*, elige la rama `main` y la carpeta `/ (root)`.
3. En *Settings → Pages → Custom domain*, escribe `www.alvaroyrocio2027.es`
   y guarda.
4. Marca **Enforce HTTPS** cuando se active (puede tardar unos minutos).

## Configurar el dominio en DonDominio

En la zona DNS del dominio:

**Registro CNAME**

| Nombre | Valor |
|---|---|
| `www` | `TU-USUARIO.github.io.` |

**Registros A** para el dominio sin `www`, los cuatro:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Comprueba estas IP en la documentación de GitHub Pages antes de meterlas,
por si las han cambiado. La propagación puede tardar hasta 24 horas, así
que hacedlo con margen y no la víspera de mandar las invitaciones.

---

## Avisos

**No subáis nunca la lista de invitados a este repositorio.** Es público:
cualquiera puede ver todos los archivos. Los nombres, teléfonos y alergias
viven solo en vuestro Drive.

El teléfono que aparece en la web es el de Álvaro (646 16 43 11). Va a
recibir bastantes mensajes en las semanas previas. Si en algún momento
resulta demasiado, cambiadlo por el de un hermano o un amigo: está en dos
sitios de `index.html`, buscando `646164311`.
