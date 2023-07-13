const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ name, exercises }) => <span>{name} {exercises}</span>

const Total = ({ parts }) => {
    const total= parts.reduce((count, part) => count + part.exercises, 0);
    return(
      <p><strong>total of {total} exercises</strong></p>
    )
}

const Content = ({ parts }) => {
    return(
      <div>
        {
          parts.map(part => (
            <p key={part.id}><Part name={part.name} exercises={part.exercises} /></p>
          ))
        }
      </div>
    )
}

const Course = ({ courses }) => {
    return(
        <div>
          <h1>Web development curriculum</h1>
          {
            courses.map(course => (
              <div key={course.id}>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
              </div>
            ))
          }
        </div>
      )
}

export default Course