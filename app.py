# import Flask
from flask import Flask, render_template, jsonify, request

# import SQL Alchemy
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

# import PyMySQL
import pymysql

# import Pandas
import pandas as pd

# import JSON
import json

# import OS
import os

# import config files
from config import remote_gwsis_dbuser, remote_gwsis_dbpwd, remote_db_host, remote_db_port, remote_gwsis_dbname
# remote_gwsis_dbuser = os.environ.get("remote_gwsis_dbuser")
# remote_gwsis_dbpwd = os.environ.get("remote_gwsis_dbpwd")
# remote_db_host = os.environ.get("remote_db_host")
# remote_db_port = os.environ.get("remote_db_port")
# remote_gwsis_dbname = os.environ.get("remote_gwsis_dbname")

# configure MySQL connection
pymysql.install_as_MySQLdb()
engine = create_engine(f'mysql://{remote_gwsis_dbuser}:{remote_gwsis_dbpwd}@{remote_db_host}:{remote_db_port}/{remote_gwsis_dbname}')
# conn = engine.connect()

# initialize flask application
app = Flask(__name__)

# set up SQL Alchemy connection and classes
Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
Centerpoints = Base.classes.centerpoint
# TPOC = Base.classes.tpoc_info_fed
# Traveler = Base.classes.traveler_info_fed
# Employee = Base.classes.fsde_employees_df
# Training = Base.classes.employee_training
# Task = Base.classes.pre_deployment_tasks


# define route for / render form
@app.route('/')
def index():
    return render_template('index.html')


# define end point for state outlines information
@app.route('/api/state_outlines')
def report():
    
    # start session
    session = Session(engine)

    # query for all records
    results = session.query(
        Centerpoints.State,
        Centerpoints.Latitude,
        Centerpoints.Latitude,
        ).all()

    # end session
    session.close()

    centerpoints = []

    for result in results:
        centerpoints.append(
            "state": result[0],
            "latitude": result[1],
            "longitude": result[2]
        )
    
    return jsonify(centerpoints)


if __name__ == '__main__':
    app.run(debug=True)