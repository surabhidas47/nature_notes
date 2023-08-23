import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './entry.reducer';

export const EntryDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const entryEntity = useAppSelector(state => state.entry.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="entryDetailsHeading">Entry</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{entryEntity.id}</dd>
          <dt>
            <span id="tripTitle">Trip Title</span>
          </dt>
          <dd>{entryEntity.tripTitle}</dd>
          <dt>
            <span id="tripLocation">Trip Location</span>
          </dt>
          <dd>{entryEntity.tripLocation}</dd>
          <dt>
            <span id="tripLength">Trip Length</span>
          </dt>
          <dd>{entryEntity.tripLength}</dd>
          <dt>
            <span id="tripDescription">Trip Description</span>
          </dt>
          <dd>{entryEntity.tripDescription}</dd>
          <dt>
            <span id="tripPhoto">Trip Photo</span>
          </dt>
          <dd>
            {entryEntity.tripPhoto ? (
              <div>
                {entryEntity.tripPhotoContentType ? (
                  <a onClick={openFile(entryEntity.tripPhotoContentType, entryEntity.tripPhoto)}>
                    <img src={`data:${entryEntity.tripPhotoContentType};base64,${entryEntity.tripPhoto}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {entryEntity.tripPhotoContentType}, {byteSize(entryEntity.tripPhoto)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="tripType">Trip Type</span>
          </dt>
          <dd>{entryEntity.tripType}</dd>
          <dt>Tag</dt>
          <dd>
            {entryEntity.tags
              ? entryEntity.tags.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {entryEntity.tags && i === entryEntity.tags.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Location</dt>
          <dd>{entryEntity.location ? entryEntity.location.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/entry" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/entry/${entryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default EntryDetail;
