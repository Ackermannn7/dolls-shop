import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { dollsTable } from '../../db/dollsSchema.js';
import { eq } from 'drizzle-orm';
import _ from 'lodash';

export async function listDolls(req: Request, res: Response) {
  try {
    const dolls = await db.select().from(dollsTable);
    res.json(dolls);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

export async function getDollById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [doll] = await db
      .select()
      .from(dollsTable)
      .where(eq(dollsTable.id, Number(id)));

    if (!doll) {
      res.status(404).send({ message: 'Doll not found' });
    } else {
      res.json(doll);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createDoll(req: Request, res: Response) {
  try {
    console.log(req.userId);

    const [doll] = await db
      .insert(dollsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(doll);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function updateDoll(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [doll] = await db
      .update(dollsTable)
      .set(updatedFields)
      .where(eq(dollsTable.id, id))
      .returning();

    if (doll) {
      res.json(doll);
    } else {
      res.status(404).send({ message: 'Doll was not found' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteDoll(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [deletedDoll] = await db
      .delete(dollsTable)
      .where(eq(dollsTable.id, id))
      .returning();
    if (deletedDoll) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Doll was not found' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
