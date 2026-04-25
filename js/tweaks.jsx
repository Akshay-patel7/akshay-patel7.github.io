// Tweaks panel for Akshay's site
const { useEffect } = React;

function App() {
  const [tweaks, setTweaks] = useTweaks(window.TWEAK_DEFAULTS);

  // Apply tweaks to the page
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', tweaks.accentColor);
    root.style.setProperty('--bg', tweaks.bgColor);

    // Grain opacity
    const style = document.getElementById('grain-override') || (() => {
      const s = document.createElement('style');
      s.id = 'grain-override';
      document.head.appendChild(s);
      return s;
    })();
    style.textContent = `body::before { opacity: ${tweaks.grainOpacity} !important; }`;

    // Marquee visibility + speed
    const marquee = document.querySelector('.marquee');
    if (marquee) marquee.style.display = tweaks.showMarquee ? '' : 'none';
    const track = document.querySelector('.marquee-track');
    if (track) track.style.animationDuration = `${tweaks.marqueeSpeed}s`;

    // Rotator
    window.__rotatorEnabled = tweaks.rotateRoles;

    // Clock
    const clock = document.getElementById('time-now');
    if (clock) clock.style.visibility = tweaks.showClock ? '' : 'hidden';
  }, [tweaks]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Color">
        <TweakColor label="Accent" value={tweaks.accentColor}
          onChange={(v) => setTweaks({ accentColor: v })} />
        <TweakColor label="Background" value={tweaks.bgColor}
          onChange={(v) => setTweaks({ bgColor: v })} />
      </TweakSection>

      <TweakSection title="Texture">
        <TweakSlider label="Grain opacity" value={tweaks.grainOpacity}
          min={0} max={0.2} step={0.01}
          onChange={(v) => setTweaks({ grainOpacity: v })} />
      </TweakSection>

      <TweakSection title="Motion">
        <TweakToggle label="Show marquee" value={tweaks.showMarquee}
          onChange={(v) => setTweaks({ showMarquee: v })} />
        <TweakSlider label="Marquee speed (s)" value={tweaks.marqueeSpeed}
          min={10} max={120} step={5}
          onChange={(v) => setTweaks({ marqueeSpeed: v })} />
        <TweakToggle label="Rotate roles" value={tweaks.rotateRoles}
          onChange={(v) => setTweaks({ rotateRoles: v })} />
        <TweakToggle label="Show live clock" value={tweaks.showClock}
          onChange={(v) => setTweaks({ showClock: v })} />
      </TweakSection>

      <TweakSection title="Presets">
        <TweakButton label="Warm orange (default)"
          onClick={() => setTweaks({ accentColor: '#e0653a', bgColor: '#0e0e0d' })} />
        <TweakButton label="Electric cyan"
          onClick={() => setTweaks({ accentColor: '#4cc9f0', bgColor: '#0a0d12' })} />
        <TweakButton label="Acid green"
          onClick={() => setTweaks({ accentColor: '#b5e853', bgColor: '#0c0e0a' })} />
        <TweakButton label="Hot pink"
          onClick={() => setTweaks({ accentColor: '#ff5d8f', bgColor: '#100c0e' })} />
        <TweakButton label="Light paper"
          onClick={() => setTweaks({ accentColor: '#d24a1c', bgColor: '#f4f0e6' })} />
      </TweakSection>
    </TweaksPanel>
  );
}

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<App />);
