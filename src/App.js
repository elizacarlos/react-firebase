import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"
import { useEffect, useState } from "react"

import { Auth } from "./components/auth"
import { db, auth, storage } from "./config/firebase"

function App() {
  const [movies, setMovies] = useState(null)
  const moviesCollection = collection(db, "movies")

  // create movie state
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

  // Update title state
  const [updatedMovieTitle, setUpdatedMovieTitle] = useState("")

  // Upload file state
  const [fileUpload, setFileUpload] = useState(null)

  const getMovies = async () => {
    try {
      const data = await getDocs(moviesCollection)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      if (filteredData) setMovies(filteredData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  const handleSubmitMovie = async () => {
    try {
      await addDoc(moviesCollection, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      })
      getMovies()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteMovie = async (movieId) => {
    const movieDoc = doc(db, "movies", movieId)
    await deleteDoc(movieDoc)
    getMovies()
  }

  const handleUpdateMovieTitle = async (movieId) => {
    const movieDoc = doc(db, "movies", movieId)

    await updateDoc(movieDoc, { title: updatedMovieTitle })
    getMovies()
  }

  const handleUploadFile = async () => {
    if (!fileUpload) return
    const fileFolder = ref(storage, `projectFiles/${fileUpload.name}`)

    try {
      await uploadBytes(fileFolder, fileUpload)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Firebase Project</h1>

      <Auth />
      {/* form for create movie */}
      <div>
        <input
          placeholder="Movie Title"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date"
          type="number"
          value={newReleaseDate}
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>Receive an Oscar?</label>
        <button onClick={handleSubmitMovie}>Submit Movies</button>
      </div>

      <div>
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id}>
              <h1 style={{ color: movie.receivedAnOscar ? "green" : "tomato" }}>
                {movie.title}
              </h1>
              <p>Date:{movie.releaseDate}</p>
              <button onClick={() => handleDeleteMovie(movie.id)}>
                Delete
              </button>
              {/* update title */}
              <input
                placeholder="New Title"
                // value={updatedMovieTitle}
                onChange={(e) => setUpdatedMovieTitle(e.target.value)}
              />
              <button onClick={() => handleUpdateMovieTitle(movie.id)}>
                Update Title
              </button>
            </div>
          ))
        ) : (
          <p>No movies available</p>
        )}
      </div>

      {/* Uploading files */}
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={handleUploadFile}>Upload File</button>
      </div>
    </div>
  )
}

export default App
