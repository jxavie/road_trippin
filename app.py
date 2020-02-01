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

# import Numpy
import numpy as np

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
# Bridges = Base.classes.bridges
# Centerpoints = Base.classes.centerpoints
Potholes = Base.classes.dc_potholes
# Crashes = Base.classes.ny_crash_ditch
# Roads = Base.classes.roads
# Spending_OECD = Base.classes.spending_OECD
# Tunnels = Base.classes.tunnel


# define route for / render form
@app.route('/')
def index():
    return render_template('index.html')


# define end point for DC pothole information
@app.route('/api/dc_potholes')
def dc_potholes():

    # start session
    session = Session(engine)

    # query for all records
    results = session.query(
        Potholes.ADDDATE,
        Potholes.SERVICEORDERSTATUS,
        Potholes.STREETADDRESS,
        Potholes.LATITUDE,
        Potholes.LONGITUDE,
        Potholes.ZIPCODE
        ).all()

    # end session
    session.close()

    potholes = []

    for result in results:
        potholes.append({
            "add_date": result[0],
            "service_order_status": result[1],
            "street_address": result[2],
            "latitude": result[3],
            "longitude": result[4],
            "zip_code": result[5]
        })

    return jsonify(potholes)


# # define end point for state outlines information
# @app.route('/api/<state>')
# def state():
    
#     target_state = state

#     # start session
#     session = Session(engine)

#     # query for all records
#     # results1 = session.query(
#     #     Centerpoints.State,
#     #     Centerpoints.Latitude,
#     #     Centerpoints.Latitude,
#     #     ).all()
    
#     # query for state centerpoints
#     centerpoint = session.query(Select)

#     # end session
#     session.close()

#     centerpoints = []

#     for result in results:
#         centerpoints.append(
#             "state": result[0],
#             "latitude": result[1],
#             "longitude": result[2]
#         )
    
#     return jsonify(centerpoints)


if __name__ == '__main__':
    app.run(debug=True)