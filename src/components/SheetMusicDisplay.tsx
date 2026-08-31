import { useEffect, useRef, useState } from 'react'
import { Midi } from '@tonejs/midi'
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay'
import * as Tone from 'tone'
import { Button } from '@/components/ui/button'

type MidiTimelineEntry = {
  time: number
  duration: number
  noteName: string
}

const SAMPLE_MUSICXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part-list>
    <score-part id="P1">
      <part-name>Music</part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>1</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>
      <note><pitch><step>C</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
    </measure>
  </part>
</score-partwise>`

function SheetMusicDisplay() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const osmdRef = useRef<OpenSheetMusicDisplay | null>(null)
  const [status, setStatus] = useState('Ready')
  const [midiTimeline, setMidiTimeline] = useState<MidiTimelineEntry[]>([])
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const osmd = new OpenSheetMusicDisplay(containerRef.current, {
      autoResize: true,
      backend: 'svg',
    })

    osmdRef.current = osmd

    osmd
      .load(SAMPLE_MUSICXML)
      .then(() => {
        osmd.render()
        setStatus('Sample score loaded')
      })
      .catch((error) => {
        console.error(error)
        setStatus('Could not load the sample score')
      })

    return () => {
      Tone.Transport.stop()
      Tone.Transport.cancel(0)
      osmd.clear()
      osmdRef.current = null
    }
  }, [])

  const handleMusicXmlUpload = async (file: File | null) => {
    if (!file || !osmdRef.current) return

    try {
      const xml = await file.text()
      await osmdRef.current.load(xml, file.name)
      osmdRef.current.render()
      setStatus(`Loaded MusicXML: ${file.name}`)
    } catch (error) {
      console.error(error)
      setStatus('Invalid MusicXML file')
    }
  }

  const handleMidiUpload = async (file: File | null) => {
    if (!file) return

    try {
      const midi = new Midi(await file.arrayBuffer())
      const notes = midi.tracks.flatMap((track) =>
        track.notes.map((note) => ({
          time: note.time,
          duration: note.duration,
          noteName: Tone.Frequency(note.midi, 'midi').toNote(),
        })),
      )

      setMidiTimeline(notes)
      setStatus(`Loaded MIDI: ${file.name} (${notes.length} notes)`)
    } catch (error) {
      console.error(error)
      setStatus('Invalid MIDI file')
    }
  }

  const handlePlayMidi = async () => {
    if (!midiTimeline.length) {
      setStatus('Load a MIDI file before playing')
      return
    }

    await Tone.start()
    Tone.Transport.stop()
    Tone.Transport.cancel(0)

    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      volume: -8,
    }).toDestination()

    new Tone.Part((time, value: MidiTimelineEntry) => {
      synth.triggerAttackRelease(value.noteName, value.duration, time)
    }, midiTimeline).start(0)

    Tone.Transport.bpm.value = 120
    Tone.Transport.start()
    setIsPlaying(true)
    setStatus('Playing MIDI timeline')

    Tone.Transport.scheduleOnce(() => {
      setIsPlaying(false)
      setStatus('Playback finished')
    }, midiTimeline[midiTimeline.length - 1]?.time + 2 || 0)
  }

  const handleStopPlayback = () => {
    Tone.Transport.stop()
    Tone.Transport.cancel(0)
    setIsPlaying(false)
    setStatus('Playback stopped')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <label className="cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm">
          Load MusicXML
          <input
            type="file"
            accept=".xml,.musicxml"
            className="hidden"
            onChange={(event) => handleMusicXmlUpload(event.target.files?.[0] ?? null)}
          />
        </label>

        <label className="cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm">
          Load MIDI
          <input
            type="file"
            accept=".mid,.midi"
            className="hidden"
            onChange={(event) => handleMidiUpload(event.target.files?.[0] ?? null)}
          />
        </label>

        <Button type="button" onClick={handlePlayMidi} disabled={!midiTimeline.length || isPlaying}>
          Play MIDI
        </Button>

        <Button type="button" variant="secondary" onClick={handleStopPlayback} disabled={!isPlaying}>
          Stop
        </Button>
      </div>

      <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
        {status}
      </div>

      <div
        ref={containerRef}
        className="min-h-[300px] w-full overflow-auto rounded-md border bg-white p-2"
      />
    </div>
  )
}

export default SheetMusicDisplay
