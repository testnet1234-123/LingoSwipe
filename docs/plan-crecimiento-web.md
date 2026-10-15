# Plan de crecimiento web de RivalWord

Estado: 16 de octubre de 2026. Prioridad: costes fijos de 0 € mientras se validan tráfico y demanda.

## Qué está publicado

- Enlaces visibles a App Store en cabecera, portada, cierre y artículo. La disponibilidad en España y la UE se indica junto al botón principal para no prometer una descarga que aún no esté habilitada en cada país.
- Blog estático en el dominio propio, con índice, primer artículo original, URL legible, canonical y sitemap. Se edita en Git y se sirve con el hosting existente; no requiere un CMS ni una suscripción.
- Página de cookies con inventario de tecnologías observadas. Se han alojado las fuentes en el propio dominio para quitar una solicitud a Google Fonts. Cloudflare Web Analytics es la analítica actual y, según Cloudflare, no usa cookies.
- Sección de newsletter visible, sin formulario ni captación activa.

## Límite legal antes de activar la newsletter

El titular indicó que no dispone de empresa, domicilio postal válido que pueda publicar ni desea aportar nombre/NIF. No se han inventado esos datos. La LSSI española exige datos de identificación y domicilio del prestador de servicios de la sociedad de la información. Para correo comercial hace falta autorización previa y baja sencilla. El régimen CAN-SPAM estadounidense exige una dirección postal física válida en los correos comerciales. El formulario de Brevo está configurado con lista separada, confirmación por correo y consentimiento expreso, pero no se enlaza ni se incrusta en la web. No se envían campañas.

Para ponerlo en marcha, el titular debe obtener una dirección postal real donde pueda recibir correspondencia y que pueda aparecer públicamente, por ejemplo un domicilio en el que viva con permiso para utilizarlo o un servicio profesional de domiciliación que admita correspondencia. La opción profesional normalmente cuesta dinero; no hay una vía universal gratuita que sustituya una dirección real. Después debe facilitar los datos de identidad aplicables a su actividad. Antes de publicar el formulario, completar aviso legal y política de privacidad de la web con responsable, finalidad, base jurídica, Brevo como encargado, transferencias cuando proceda, conservación y derechos. En Brevo, añadir enlace directo a esa política al texto de consentimiento y verificar remitente, pie postal y enlace de baja. Revisar las obligaciones concretas con asesoría local si vende o monetiza desde España.

Fuentes oficiales: [BOE, LSSI](https://www.boe.es/eli/es/l/2002/07/11/34/con), [Comisión Europea, información a interesados](https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en), [FTC, CAN-SPAM](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business), [AEPD, guía de cookies](https://www.aepd.es/guias/guia-cookies.pdf).

## Blog y posicionamiento

Publicar una guía útil cada dos semanas durante tres meses. Cada entrada debe resolver una pregunta concreta, incluir un ejercicio comprobable, tener autor/fecha, enlazar a otra guía pertinente y a la app cuando venga al caso. Evitar artículos generados en masa, promesas de resultados y páginas duplicadas solo para captar búsquedas. Medir impresiones, clics y consultas en Search Console antes de aumentar la frecuencia.

| Mes | Tema de entrada | Intención de búsqueda | Ejercicio propio |
| --- | --- | --- | --- |
| 1 | Cómo recordar vocabulario en 10 minutos | rutina de repaso | recuperar 5 palabras sin verlas |
| 1 | Cómo practicar inglés 10 minutos al día | hábito diario | plan de 7 días |
| 2 | Artículos en alemán: der, die, das | duda concreta | clasificar 12 sustantivos |
| 2 | Frases básicas para viajar en francés | situación práctica | mini diálogo |
| 3 | Cómo aprender el alfabeto búlgaro | idioma distintivo de la app | leer 8 palabras |
| 3 | Juegos de vocabulario para practicar con amigos | práctica social | reto de dos personas |

Agrupar más adelante las guías por idioma y nivel cuando haya suficiente contenido. Crear una URL por idioma solo cuando exista una traducción humana útil y añadir `hreflang` correctamente. Priorizar contenido original y experiencia real con la app. Guía oficial: [Google Search Central, contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) y [sitios multilingües](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).

## Email marketing sin coste inicial

Brevo tiene una lista exclusiva para suscriptores de la web y un formulario con confirmación doble. Una vez resuelto el bloqueo legal, incrustar o enlazar ese formulario, probar confirmación y baja con una dirección de prueba, y enviar como máximo un correo útil por semana. Mantener los contactos de newsletter separados de usuarios de la app; nunca importar usuarios de la app sin su consentimiento específico. Empezar con una secuencia de bienvenida de un correo y un boletín semanal manual. La cuota gratuita y sus condiciones pueden cambiar, por lo que se revisarán en Brevo antes de lanzar campañas. No hace falta contratar un CMS: el blog estático es suficiente para esta fase.

## Comprobación mensual

Revisar las tecnologías cargadas por la web y actualizar la página de cookies si se añade analítica, publicidad o widgets. Si se instala una tecnología que requiere consentimiento, bloquearla hasta que el visitante elija y ofrecer aceptar y rechazar al mismo nivel. Revisar enlaces de App Store por país y accesibilidad móvil. Comprobar en Search Console indexación, páginas con tráfico y consultas que merezcan una guía mejor.
