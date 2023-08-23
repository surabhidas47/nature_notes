import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './location.reducer';

export const LocationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const locationEntity = useAppSelector(state => state.location.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="locationDetailsHeading">Location</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{locationEntity.id}</dd>
          <dt>
            <span id="locationName">Location Name</span>
          </dt>
          <dd>{locationEntity.locationName}</dd>
          <dt>
            <span id="street">Street</span>
          </dt>
          <dd>{locationEntity.street}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{locationEntity.city}</dd>
          <dt>
            <span id="state">State</span>
          </dt>
          <dd>{locationEntity.state}</dd>
          <dt>
            <span id="zipcode">Zipcode</span>
          </dt>
          <dd>{locationEntity.zipcode}</dd>
          <dt>
            <span id="latLong">Lat Long</span>
          </dt>
          <dd>{locationEntity.latLong}</dd>
        </dl>
        <Button tag={Link} to="/location" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/location/${locationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default LocationDetail;
