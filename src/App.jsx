import React, { useState, useEffect, useRef } from 'react';
import styles from './App.module.css';

function App() {
    const [volume, setVolume] = useState(0.5); // Estado para el volumen
    const [showKeys, setShowKeys] = useState(true); // Estado para mostrar las teclas
    const audioRef = useRef(new Audio()); // Referencia al objeto Audio

    const handlePlayTune = (key) => {
        const audio = audioRef.current;
        audio.src = `/tunes/${key}.wav`; // Actualizar la fuente del audio
        audio.volume = volume; // Establecer el volumen
        // Detener la reproducción actual y reiniciar con el nuevo audio
        audio.pause();
        audio.currentTime = 0; // Reiniciar el audio actual si es necesario

        // Lógica para resaltar la tecla presionada
        const clickedKey = document.querySelector(`[data-key="${key}"]`);
        if (clickedKey) {
            clickedKey.classList.add(styles.active);
            setTimeout(() => {
                clickedKey.classList.remove(styles.active);
            }, 150);
        }

        // Reproducir audio con una pequeña pausa para ajustar el volumen
        setTimeout(() => {
            audio.play()
                .catch(error => {
                    console.error('Error playing audio:', error);
                });
        }, 50); // Ajusta este valor según sea necesario
    };

    const handleVolumeChange = (e) => {
        const vol = parseFloat(e.target.value); // Convertir a número decimal
        setVolume(vol); // Actualizar el estado del volumen
    };

    const handleShowKeysChange = (e) => {
        setShowKeys(e.target.checked); // Actualizar el estado de showKeys
    };

    const handleKeyDown = (event) => {
        // Obtener la tecla presionada como string
        const key = event.key.toLowerCase();

        // Verificar si la tecla presionada corresponde a una nota del piano
        if (allKeys.includes(key)) {
            handlePlayTune(key);
        }
    };

    useEffect(() => {
        // Agregar el event listener para detectar las pulsaciones de teclas
        document.addEventListener('keydown', handleKeyDown);

        // Limpiar el event listener al desmontar el componente
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Arreglo de todas las teclas disponibles
    const allKeys = ["a", "w", "s", "e", "d", "f", "t", "g", "y", "h", "u", "j", "k", "o", "l", "p", "m"];

    return (
        <div className={styles.wrapper}>
            <header>
                <h1>PIANO</h1>
                <div className={`${styles.column} ${styles['volume-slider']}`}>
                    <span>Volume</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        value={volume}
                        step="any"
                        onChange={handleVolumeChange}
                    />
                </div>
                <div className={`${styles.column} ${styles['keys-checkbox']}`}>
                    <span>Show Keys</span>
                    <input
                        type="checkbox"
                        checked={showKeys}
                        onChange={handleShowKeysChange}
                    />
                </div>
            </header>
            <ul className={styles['piano-keys']}>
                {allKeys.map((key) => (
                    <li
                        key={key}
                        className={`${styles.key} ${styles[key === "a" || key === "s" || key === "d" || key === "f" || key === "g" || key === "h" || key === "j" || key === "k" || key === "l" || key === "m" ? "white" : "black"]}`}
                        data-key={key}
                        onClick={() => handlePlayTune(key)}
                    >
                        {showKeys && <span>{key}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
