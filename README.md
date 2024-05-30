# Quantenemulator

Um den Quantenemulator aufsetzen zu können, wird im folgenden die Anleitung beschrieben:

-----------------------------------------------------------------------------
Download und Installation aller notwendigen Aspekte:
- Python: https://www.python.org/downloads
- Node.js: https://nodejs.org/en
- Git: https://git-scm.com/downloads

- nachdem alle Aspekte gedownloaded und installiert wurden, IDE schließen und erneut öffnen
- um zu prüfen, ob alles funktioniert hat, folgende Befehle im Terminal eingeben: pip --version, npm --version, python --version, git --version
- wenn bei allen Befehlen eine Version angezeigt wird, ist die Installation beendet
- bevor das Projekt laufen kann, muss der venv Ordner innerhalb des Unterordners Backend gelöscht werden
----------------------------------------------------------------------------
Aufsetzen der Applikation:
- ein Terminal öffnen und in den Unterordner Backend begeben
- Befehl: python -m venv venv ausführen
- nun sollte ein kleiner Vermerk aufgetaucht sein, dass man sich innerhalb der virtuellen Umgebung befindet
- Befehl: python -m pip install cirq ausführen
- Befehl: pip install -r requirements.txt ausführen
- nachdem alles durchlaufen ist, in den Unterordner src begeben
- Befehl: python manage.py runserver ausführen
- Der Backend-Server läuft nun, jetzt geht es weiter mit dem Frontend

- ein neues Terminal öffnen und in den Unterordner Frontend begeben
- Befehl: npm install ausführen
- nachdem Installation beendet ist, den Befehl: npm run dev ausführen
- nun läuft die Applikation :)