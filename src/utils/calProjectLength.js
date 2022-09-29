export default function calcProjectLength(projects, id) {
  return projects?.slice().filter((p) => p.status === id).length || 0;
}
