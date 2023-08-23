import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITag } from 'app/shared/model/tag.model';
import { getEntities as getTags } from 'app/entities/tag/tag.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { IEntry } from 'app/shared/model/entry.model';
import { getEntity, updateEntity, createEntity, reset } from './entry.reducer';

export const EntryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const tags = useAppSelector(state => state.tag.entities);
  const locations = useAppSelector(state => state.location.entities);
  const entryEntity = useAppSelector(state => state.entry.entity);
  const loading = useAppSelector(state => state.entry.loading);
  const updating = useAppSelector(state => state.entry.updating);
  const updateSuccess = useAppSelector(state => state.entry.updateSuccess);

  const handleClose = () => {
    navigate('/entry');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTags({}));
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
      tags: mapIdList(values.tags),
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
          ...entryEntity,
          tags: entryEntity?.tags?.map(e => e.id.toString()),
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
              <ValidatedField label="Trip Location" id="entry-tripLocation" name="tripLocation" data-cy="tripLocation" type="text" />
              <ValidatedField label="Trip Length" id="entry-tripLength" name="tripLength" data-cy="tripLength" type="text" />
              <ValidatedField
                label="Trip Description"
                id="entry-tripDescription"
                name="tripDescription"
                data-cy="tripDescription"
                type="textarea"
              />
              <ValidatedBlobField label="Trip Photo" id="entry-tripPhoto" name="tripPhoto" data-cy="tripPhoto" isImage accept="image/*" />
              <ValidatedField label="Trip Type" id="entry-tripType" name="tripType" data-cy="tripType" type="text" />
              <ValidatedField label="Tag" id="entry-tag" data-cy="tag" type="select" multiple name="tags">
                <option value="" key="0" />
                {tags
                  ? tags.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="entry-location" name="location" data-cy="location" label="Location" type="select">
                <option value="" key="0" />
                {locations
                  ? locations.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
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
