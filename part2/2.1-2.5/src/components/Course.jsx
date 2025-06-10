const Course = ({course}) => {
    
  const total = course.parts.reduce((sum,part) => sum + part.exercises,0)
  return (
    <>
      <h2>{course.name}</h2>
        {course.parts.map(part =>
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )}
        <p><strong>total of {total} excercises</strong></p>
    </>
    
  )
}
export default Course