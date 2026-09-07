from configparser import ConfigParser
import psycopg2
from contextlib import contextmanager


def config(filename='.env', section='postgresql'):
    parser = ConfigParser()
    parser.read(filename)

    db = {}
    if parser.has_section(section):
        params = parser.items(section)

        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception(f"Section {section} not found in {filename} file.")

    return db

class DatabaseConnector:
    _conn = None

    @classmethod
    def connect(cls):
        if cls._conn is None or cls._conn.close != 0:
            params = config()
            cls._conn = psycopg2.connect(**params)
        return cls._conn

    @classmethod
    @contextmanager
    def get_connection(cls):
        conn = cls.connect()
        try:
            yield conn
            conn.commit()
        except Exception as e:
            print(e)
            conn.rollback()
        finally:
            conn.close()

if __name__ == '__main__':
    with DatabaseConnector.get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT version()")
            print(cursor.fetchone())
           