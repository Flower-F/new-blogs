import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

interface ArticleType {
  title: string
  date: string
  keywords: string[]
}

/** 获取所有的文章 */
export const getAllData = (folderPath: string) => {
  let fileNames: string[] = []
  if (fs.existsSync(folderPath)) {
    fileNames = fs.readdirSync(folderPath, { encoding: 'utf-8' })
  } else {
    console.warn('The folder path doesn\'t exist')
  }

  const allData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullFolderPath = path.join(folderPath, fileName)
    let fileContent = ''
    if (fs.existsSync(fullFolderPath)) {
      fileContent = fs.readFileSync(fullFolderPath, { encoding: 'utf-8' })
    } else {
      console.warn('The file path doesn\'t exist')
    }

    const matterResult = matter(fileContent)

    return {
      id,
      ...matterResult.data as ArticleType,
    }
  })

  allData.sort((a, b) => a.date < b.date ? 1 : -1)

  return allData
}

/** 用于强制 Nextjs 进行预渲染 */
export function getAllIds(folderPath: string) {
  let fileNames: string[] = []
  if (fs.existsSync(folderPath)) {
    fileNames = fs.readdirSync(folderPath)
  }
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

/** 根据指定 id 获取文章内容 */
export const getDataById = (folderPath: string, id: string) => {
  const filePath = path.join(folderPath, `${id}.md`)
  let fileContent = ''
  if (fs.existsSync(filePath)) {
    fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
  } else {
    console.warn('The file path doesn\'t exist')
  }

  const matterResult = matter(fileContent)

  return {
    id,
    content: matterResult.content,
    ...matterResult.data as ArticleType,
  }
}

const notesPath = path.join(process.cwd(), 'notes')
export const getAllNotesData = () => getAllData(notesPath)
export const getNotesDataById = (id: string) => getDataById(notesPath, id)
export const getAllNotesIds = () => getAllIds(notesPath)

const blogsPath = path.join(process.cwd(), 'blogs')
export const getAllBlogsData = () => getAllData(blogsPath)
export const getBlogsDataById = (id: string) => getDataById(blogsPath, id)
export const getAllBlogsIds = () => getAllIds(blogsPath)

export interface ArticleTitleType extends ArticleType {
  id: string
}
export interface ArticleDetailType extends ArticleType {
  id: string
  content: string
}
