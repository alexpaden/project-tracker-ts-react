import { Request, Response } from 'express'
import { Note } from '../entity/Note'

const fieldsToSelect = ['note.id', 'note.bugId', 'note.body']

export const getNotes = async (req: Request, res: Response) => {
  const { bugId } = req.params
  const notes = await Note.createQueryBuilder('note')
    .where('"bugId" = :bugId', { bugId })
    .select(fieldsToSelect)
    .getMany()

  res.json(notes)
}

export const postNote = async (req: Request, res: Response) => {
  const { body } = req.body
  const { bugId } = req.params

  if (!body || body.trim() === '') {
    return res
      .status(400)
      .send({ message: 'Note body field must not be empty.' })
  }

  const newNote = Note.create({ body, bugId })
  await newNote.save()

  res.status(201).json(newNote)
}

export const deleteNote = async (req: Request, res: Response) => {
  const { noteId } = req.params

  const targetNote = await Note.findOneBy({ id: Number(noteId) })

  if (!targetNote) {
    return res.status(404).send({ message: 'Invalid note ID.' })
  }

  await targetNote.remove()
  res.status(204).end()
}

export const updateNote = async (req: Request, res: Response) => {
  const { body } = req.body
  const { noteId } = req.params

  if (!body || body.trim() === '') {
    return res
      .status(400)
      .send({ message: 'Note body field must not be empty.' })
  }

  const targetNote = await Note.findOneBy({ id: Number(noteId) })

  if (!targetNote) {
    return res.status(404).send({ message: 'Invalid note ID.' })
  }

  targetNote.body = body
  await targetNote.save()
  res.json(targetNote)
}
