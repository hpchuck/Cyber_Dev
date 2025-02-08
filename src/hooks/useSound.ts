import { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';

export const useSound = () => {
  const { isAudioEnabled, volume, audioFiles } = useStore();
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const submitSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSoundRef.current = new Audio(audioFiles.buttonClick);
    clickSoundRef.current = new Audio(audioFiles.soundToggle);
    submitSoundRef.current = new Audio(audioFiles.formSubmit);
    
    // Set volume for all sounds
    [hoverSoundRef, clickSoundRef, submitSoundRef].forEach(ref => {
      if (ref.current) {
        ref.current.volume = volume;
      }
    });

    return () => {
      [hoverSoundRef, clickSoundRef, submitSoundRef].forEach(ref => {
        ref.current = null;
      });
    };
  }, [volume]);

  const playHoverSound = () => {
    if (isAudioEnabled && hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play().catch(console.error);
    }
  };

  const playClickSound = () => {
    if (isAudioEnabled && clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(console.error);
    }
  };

  const playSubmitSound = () => {
    if (isAudioEnabled && submitSoundRef.current) {
      submitSoundRef.current.currentTime = 0;
      submitSoundRef.current.play().catch(console.error);
    }
  };

  return {
    playHoverSound,
    playClickSound,
    playSubmitSound
  };
};

// HOC to add sound effects to any component
export const withSoundEffects = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { playHoverSound, playClickSound } = useSound();

    return (
      <div
        onMouseEnter={playHoverSound}
        onClick={playClickSound}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };
};

// Custom hook for button sound effects
export const useButtonSound = () => {
  const { playHoverSound, playClickSound } = useSound();

  const buttonProps = {
    onMouseEnter: playHoverSound,
    onClick: playClickSound,
  };

  return buttonProps;
};