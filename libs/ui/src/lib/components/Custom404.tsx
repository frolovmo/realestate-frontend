import Link from 'next/link';

const Custom404 = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sorry, page not found</h1>
      <p style={styles.message}>
        The page you're looking for doesn't exist.
      </p>
      <Link href="/" style={styles.link}>
        Go back to the Login Page
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  message: {
    margin: '1rem 0',
  },
  link: {
    color: '#0070f3',
    textDecoration: 'none',
    fontSize: '1rem',
  },
};

export default Custom404;