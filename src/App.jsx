import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

function App() {
    const [volume, setVolume] = useState(0.5); // Estado para el volumen

    const handlePlayTune = (key) => {
        const audio = new Audio(`/tunes/${key}.wav`); // Ruta relativa al directorio público
        audio.volume = volume; // Establecer el volumen
        audio.play();

        // Lógica para resaltar la tecla presionada
        const clickedKey = document.querySelector(`[data-key="${key}"]`);
        if (clickedKey) {
            clickedKey.classList.add(styles.active);
            setTimeout(() => {
                clickedKey.classList.remove(styles.active);
            }, 150);
        }
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value); // Actualizar el estado del volumen
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Obtener la tecla presionada como string
            const key = event.key.toLowerCase();

            // Verificar si la tecla presionada corresponde a una nota del piano
            if (allKeys.includes(key)) {
                handlePlayTune(key);
            }
        };

        // Agregar el event listener para detectar las pulsaciones de teclas
        document.addEventListener('keydown', handleKeyDown);

        // Limpiar el event listener al desmontar el componente
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // El array vacío asegura que este efecto solo se ejecute una vez al montar el componente


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
                    <input type="checkbox" checked/>
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
                        <span>{key}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
