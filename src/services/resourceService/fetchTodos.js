import { downloadTodos } from './downloadTodos';

export async function fetchTodos(id, pageNo) {
  // console.log('fetchTodos called');
  return downloadTodos(id, pageNo);
  // console.log('downloadedTodos', downloadedTodos);
}
