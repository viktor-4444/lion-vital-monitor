LION // VITAL MONITOR — PWA inicial

CONTENIDO
- index.html: monitor existente adaptado para instalarse como PWA.
- manifest.webmanifest: nombre, icono, orientación horizontal y modo standalone.
- service-worker.js: caché offline de la interfaz.
- icons/: iconos de la aplicación.

QUÉ FUNCIONA EN ESTA PRIMERA VERSIÓN
- Interfaz original, gráficas, simulación local y sonidos.
- En HTTPS la app funciona de forma autónoma y no intenta abrir un WebSocket inseguro.
- Los archivos quedan preparados para caché offline después de abrir la app una vez.

IMPORTANTE SOBRE LA ESP32
La PWA servida desde HTTPS no puede abrir ws://192.168.4.1:81 por las restricciones
 de contenido mixto de los navegadores. La página servida directamente por la ESP32
por HTTP sí puede conectarse a su WebSocket. La integración entre ambos modos se
resolverá en una siguiente etapa (por ejemplo, con una app Android contenedora o
un puente seguro); no se debe asumir que la PWA HTTPS ya puede hablar con la ESP32.

PRUEBA LOCAL EN PC (solo vista previa; HTTP local no permite instalar PWA en Android)
1. Descomprime la carpeta.
2. Abre una terminal dentro de la carpeta lion_vital_pwa.
3. Ejecuta: python -m http.server 8000
4. En la PC abre: http://localhost:8000

INSTALACIÓN EN ANDROID
Para instalarla como PWA, los archivos deben publicarse en un hosting HTTPS
(por ejemplo, GitHub Pages). Después abre la URL en Chrome Android, toca el menú
(⋮) y selecciona "Instalar aplicación" o "Agregar a pantalla principal".
Abre la app una vez con internet para que el service worker guarde los archivos.
Después podrá abrirse sin internet.
