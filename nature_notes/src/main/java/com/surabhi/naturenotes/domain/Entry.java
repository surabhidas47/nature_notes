package com.surabhi.naturenotes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.surabhi.naturenotes.domain.enumeration.Adventure;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Entry.
 */
@Entity
@Table(name = "entry")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Entry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "trip_title")
    private String tripTitle;

    @Column(name = "trip_location")
    private String tripLocation;

    @Column(name = "trip_length")
    private Integer tripLength;

    @Lob
    @Column(name = "trip_description")
    private String tripDescription;

    @Lob
    @Column(name = "trip_photo")
    private byte[] tripPhoto;

    @Column(name = "trip_photo_content_type")
    private String tripPhotoContentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "adventure")
    private Adventure adventure;

    @ManyToOne
    @JsonIgnoreProperties(value = { "tripLocations" }, allowSetters = true)
    private Location location;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Entry id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTripTitle() {
        return this.tripTitle;
    }

    public Entry tripTitle(String tripTitle) {
        this.setTripTitle(tripTitle);
        return this;
    }

    public void setTripTitle(String tripTitle) {
        this.tripTitle = tripTitle;
    }

    public String getTripLocation() {
        return this.tripLocation;
    }

    public Entry tripLocation(String tripLocation) {
        this.setTripLocation(tripLocation);
        return this;
    }

    public void setTripLocation(String tripLocation) {
        this.tripLocation = tripLocation;
    }

    public Integer getTripLength() {
        return this.tripLength;
    }

    public Entry tripLength(Integer tripLength) {
        this.setTripLength(tripLength);
        return this;
    }

    public void setTripLength(Integer tripLength) {
        this.tripLength = tripLength;
    }

    public String getTripDescription() {
        return this.tripDescription;
    }

    public Entry tripDescription(String tripDescription) {
        this.setTripDescription(tripDescription);
        return this;
    }

    public void setTripDescription(String tripDescription) {
        this.tripDescription = tripDescription;
    }

    public byte[] getTripPhoto() {
        return this.tripPhoto;
    }

    public Entry tripPhoto(byte[] tripPhoto) {
        this.setTripPhoto(tripPhoto);
        return this;
    }

    public void setTripPhoto(byte[] tripPhoto) {
        this.tripPhoto = tripPhoto;
    }

    public String getTripPhotoContentType() {
        return this.tripPhotoContentType;
    }

    public Entry tripPhotoContentType(String tripPhotoContentType) {
        this.tripPhotoContentType = tripPhotoContentType;
        return this;
    }

    public void setTripPhotoContentType(String tripPhotoContentType) {
        this.tripPhotoContentType = tripPhotoContentType;
    }

    public Adventure getAdventure() {
        return this.adventure;
    }

    public Entry adventure(Adventure adventure) {
        this.setAdventure(adventure);
        return this;
    }

    public void setAdventure(Adventure adventure) {
        this.adventure = adventure;
    }

    public Location getLocation() {
        return this.location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Entry location(Location location) {
        this.setLocation(location);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Entry)) {
            return false;
        }
        return id != null && id.equals(((Entry) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Entry{" +
            "id=" + getId() +
            ", tripTitle='" + getTripTitle() + "'" +
            ", tripLocation='" + getTripLocation() + "'" +
            ", tripLength=" + getTripLength() +
            ", tripDescription='" + getTripDescription() + "'" +
            ", tripPhoto='" + getTripPhoto() + "'" +
            ", tripPhotoContentType='" + getTripPhotoContentType() + "'" +
            ", adventure='" + getAdventure() + "'" +
            "}";
    }
}
