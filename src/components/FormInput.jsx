// eslint-disable-next-line no-unused-vars
import React, { Component, useState } from "react";
import { Container, Card, Row, Col, Form, Button,  } from "react-bootstrap";

function formatDate(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
}

function FormInput() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: "", body: "" });
    const [searchTerm, setSearchTerm] = useState("");

    // State untuk melacak jumlah karakter yang telah dimasukkan dalam input judul
    const [charCount, setCharCount] = useState(0);
    const maxCharCount = 50; // Batas karakter

    const [archivedNotes, setArchivedNotes] = useState([]);

    const handleTitleChange = (e) => {
        const title = e.target.value;
        const charLength = title.length;
        setCharCount(charLength);
        setNewNote({ ...newNote, title });
    };

    const addNote = () => {
        // Generate a unique ID using a timestamp
        const id = +new Date();

        // Create a new note object with the current time
        const newNoteObject = {
            id,
            title: newNote.title,
            body: newNote.body,
            archived: false,
            createdAt: formatDate(new Date()), // Format the current date
        };

        // Update the state with the new note
        setNotes([...notes, newNoteObject]);

        // Clear the input fields
        setNewNote({ title: "", body: "" });

        // Reset charCount
        setCharCount(0);
    };

    const deleteNote = (id) => {
        // Filter out the note with the specified ID and update the state
        setNotes(notes.filter((note) => note.id !== id));
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // const nonArchivedNotes = notes.filter((note) => !note.archived);
    // const archivedNotes = notes.filter((note) => note.archived);
    const toggleArchive = (noteId) => {
        const noteToArchive = notes.find((note) => note.id === noteId);
        if (noteToArchive) {
            noteToArchive.archived = !noteToArchive.archived;

            // Update state catatan yang diarsipkan
            if (noteToArchive.archived) {
                setArchivedNotes([...archivedNotes, noteToArchive]);
                // Hapus catatan dari daftar utama
                setNotes(notes.filter((note) => note.id !== noteId));
            } else {
                // Jika catatan tidak diarsipkan, tambahkan ke daftar utama
                setNotes([...notes, noteToArchive]);
                // Hapus catatan dari daftar catatan yang diarsipkan
                setArchivedNotes(archivedNotes.filter((note) => note.id !== noteId));
            }
        }
    };

    const deleteArchivedNote = (noteId) => {
        // Hapus catatan dari daftar catatan yang diarsipkan
        setArchivedNotes(archivedNotes.filter((note) => note.id !== noteId));
    };

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>
                                <h5>Title</h5>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={newNote.title}
                                onChange={handleTitleChange}
                                maxLength={maxCharCount}
                            />
                            <p>{maxCharCount - charCount} karakter tersisa</p>
                        </Form.Group>
                        <Form.Group controlId="formBody">
                            <Form.Label>
                                <h5>Body</h5>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter body"
                                value={newNote.body}
                                onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={addNote} size="sm" className="mt-3 mb-3">
                            Add Note
                        </Button>
                    </Form>
                    <Form className="mb-4">
                        <Form.Group controlId="formSearch">
                            <Form.Control
                                type="text"
                                placeholder="Cari catatan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    
                </Col>
                
            </Row>
            <h4>Note List</h4>
            {filteredNotes.length === 0 ? (
                <p>Tidak ada catatan.</p>
            ) : (
                <Row>
                    {filteredNotes.map((note) => (      
                    <Col key={note.id} xs={12} sm={6} md={3}>
                        <Card style={{ width: "18rem" }} >
                            <Card.Body>
                                <Card.Title>{note.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {note.createdAt}
                                </Card.Subtitle>
                                <Card.Text>{note.body}</Card.Text>
                                <Button className="me-2" variant="danger" onClick={() => deleteNote(note.id)}>
                                    Hapus
                                </Button>
                                <Button
                                    variant={note.archived ? "primary" : "secondary"}
                                    onClick={() => toggleArchive(note.id)}
                                >
                                    {note.archived ? "Kembalikan dari Arsip" : "Arsipkan"}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    ))}
                </Row>
                
            )}
            <h4 className="mt-4">Archive Note List</h4>
            {filteredNotes.length === 0 ? (
                <p>Tidak ada catatan.</p>
            ) : (
                <Card style={{ width: "18rem" }}>
                    {archivedNotes.map((note) => (
                        <Card.Body key={note.id}>
                            <Card.Title>{note.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                {note.createdAt}
                            </Card.Subtitle>
                            <Card.Text>{note.body}</Card.Text>
                            <Button variant="danger" onClick={() => deleteArchivedNote(note.id)}>
                                Hapus
                            </Button>
                            
                        </Card.Body>
                    ))}
                </Card>
            )}
        </Container>
    );
}

export default FormInput;
