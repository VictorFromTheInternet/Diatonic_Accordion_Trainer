# Diatonic Accordion Trainer
This app is intended to help with learning the accordion in a visual way by providing various "play-along" tools for imported sheet music. The features will include: a sheet music reader, button/note highlighting, and tempo control.

## basic wireframe
 _________________________________________________
|                                                  |
|             settings / controls                  |
| _________________________________________________
|            |                                     |
|            |                                     |
|            |                                     |
|            |                                     |
|  buttton   |           sheet music               |
|  layout    |                                     |
|            |                                     |
|            |                                     |
|            |                                     |
___________________________________________________

## TODO
* settings input fields
    * accordion tuning:     dropdown
    * midi file:            file input
    * musicXML file:        file input
    * tempo:                number
    * tempo decrement:      button
    * tempo increment:      button
    * play/pause:           button
* add a midi file import feature
    * will have a play/pause button
    * will have a tempo number field and increment/decrement button
    * audio can be played by the browser
* add a musicXML file import feature
    * imported music can be displayed on the screen as sheet music     
* add diatonic accordion keyboard UI with the following tunings:
    * G/C/F (Sol)
    * F/Bb/Eb (Fa)
    * E/A/D (Mi)    
* add state UI for each of the accordion buttons on the keyboard    
    * button state: default
        * display notes label for both push/pull 
        * push will be on the left half of the button
        * pull will be on the right half of the button
        * label font will be grey and not as noticable, slightly transparent
    * button state: on select
        * highlight left/right half of the button depending on bellows state (push/pull)
        * highlight color will be transparent red
        * button label font color of the associated note (left/right) will become black instead of light grey
    * bellows state: default/pull
        * notes played/buttons selected will be for pull
* default sample files for the app
    * scales
    * Ramon Ayala
    * Los Tigres Del Norte


## Misc Notes
* Ideally the imported midi and musicXML files will be parallel (not from different sources)
* an example of ideal user workflow would be exporting sheet music (midi & musicXML) from Musescore and then importing here

## maybe laters
* interactive keyboard sandbox with keyboard mappings/inputs for each accordion button
* inspo: https://www.keyboardaccordion.com/diatonic