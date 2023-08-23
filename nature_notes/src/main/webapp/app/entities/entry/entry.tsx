import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEntry } from 'app/shared/model/entry.model';
import { getEntities } from './entry.reducer';

export const Entry = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const entryList = useAppSelector(state => state.entry.entities);
  const loading = useAppSelector(state => state.entry.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="entry-heading" data-cy="EntryHeading">
        Entries
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/entry/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Entry
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {entryList && entryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Trip Title</th>
                <th>Trip Location</th>
                <th>Trip Length</th>
                <th>Trip Description</th>
                <th>Trip Photo</th>
                <th>Trip Type</th>
                <th>Tag</th>
                <th>Location</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {entryList.map((entry, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/entry/${entry.id}`} color="link" size="sm">
                      {entry.id}
                    </Button>
                  </td>
                  <td>{entry.tripTitle}</td>
                  <td>{entry.tripLocation}</td>
                  <td>{entry.tripLength}</td>
                  <td>{entry.tripDescription}</td>
                  <td>
                    {entry.tripPhoto ? (
                      <div>
                        {entry.tripPhotoContentType ? (
                          <a onClick={openFile(entry.tripPhotoContentType, entry.tripPhoto)}>
                            <img src={`data:${entry.tripPhotoContentType};base64,${entry.tripPhoto}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {entry.tripPhotoContentType}, {byteSize(entry.tripPhoto)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{entry.tripType}</td>
                  <td>
                    {entry.tags
                      ? entry.tags.map((val, j) => (
                          <span key={j}>
                            <Link to={`/tag/${val.id}`}>{val.id}</Link>
                            {j === entry.tags.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>{entry.location ? <Link to={`/location/${entry.location.id}`}>{entry.location.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/entry/${entry.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/entry/${entry.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/entry/${entry.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Entries found</div>
        )}
      </div>
    </div>
  );
};

export default Entry;
