import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { IEntry } from 'app/shared/model/entry.model';
import { Adventure } from 'app/shared/model/enumerations/adventure.model';
import { Season } from 'app/shared/model/enumerations/season.model';
import { getEntity, updateEntity, createEntity, reset } from './entry.reducer';

export const EntryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const locations = useAppSelector(state => state.location.entities);
  const entryEntity = useAppSelector(state => state.entry.entity);
  const loading = useAppSelector(state => state.entry.loading);
  const updating = useAppSelector(state => state.entry.updating);
  const updateSuccess = useAppSelector(state => state.entry.updateSuccess);
  const adventureValues = Object.keys(Adventure);
  const seasonValues = Object.keys(Season);

  const handleClose = () => {
    navigate('/entry');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getLocations({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...entryEntity,
      ...values,
      location: locations.find(it => it.id.toString() === values.location.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          adventure: 'CAMPING',
          season: 'SUMMER',
          ...entryEntity,
          location: entryEntity?.location?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="natureNotesApp.entry.home.createOrEditLabel" data-cy="EntryCreateUpdateHeading">
            Create or edit a Entry
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="entry-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Trip Title" id="entry-tripTitle" name="tripTitle" data-cy="tripTitle" type="text" />
              <ValidatedField label="Trip Date" id="entry-tripDate" name="tripDate" data-cy="tripDate" type="date" />
              <ValidatedField label="Trip Length" id="entry-tripLength" name="tripLength" data-cy="tripLength" type="text" />
              <ValidatedField
                label="Trip Description"
                id="entry-tripDescription"
                name="tripDescription"
                data-cy="tripDescription"
                type="textarea"
              />
              <ValidatedBlobField label="Trip Photo" id="entry-tripPhoto" name="tripPhoto" data-cy="tripPhoto" isImage accept="image/*" />
              <ValidatedField label="Adventure" id="entry-adventure" name="adventure" data-cy="adventure" type="select">
                {adventureValues.map(adventure => (
                  <option value={adventure} key={adventure}>
                    {adventure}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Season" id="entry-season" name="season" data-cy="season" type="select">
                {seasonValues.map(season => (
                  <option value={season} key={season}>
                    {season}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="entry-location" name="location" data-cy="location" label="Location" type="select">
                <option value="" key="0" />
                {locations
                  ? locations.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.locationName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/entry" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EntryUpdate;
