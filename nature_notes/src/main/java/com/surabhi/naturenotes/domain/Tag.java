package com.surabhi.naturenotes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Tag.
 */
@Entity
@Table(name = "tag")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Tag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "camping")
    private String camping;

    @Column(name = "hike")
    private String hike;

    @Column(name = "road_trip")
    private String roadTrip;

    @Column(name = "international")
    private String international;

    @Column(name = "solo_travel")
    private String soloTravel;

    @ManyToMany(mappedBy = "tags")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tags", "location" }, allowSetters = true)
    private Set<Entry> entries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Tag id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCamping() {
        return this.camping;
    }

    public Tag camping(String camping) {
        this.setCamping(camping);
        return this;
    }

    public void setCamping(String camping) {
        this.camping = camping;
    }

    public String getHike() {
        return this.hike;
    }

    public Tag hike(String hike) {
        this.setHike(hike);
        return this;
    }

    public void setHike(String hike) {
        this.hike = hike;
    }

    public String getRoadTrip() {
        return this.roadTrip;
    }

    public Tag roadTrip(String roadTrip) {
        this.setRoadTrip(roadTrip);
        return this;
    }

    public void setRoadTrip(String roadTrip) {
        this.roadTrip = roadTrip;
    }

    public String getInternational() {
        return this.international;
    }

    public Tag international(String international) {
        this.setInternational(international);
        return this;
    }

    public void setInternational(String international) {
        this.international = international;
    }

    public String getSoloTravel() {
        return this.soloTravel;
    }

    public Tag soloTravel(String soloTravel) {
        this.setSoloTravel(soloTravel);
        return this;
    }

    public void setSoloTravel(String soloTravel) {
        this.soloTravel = soloTravel;
    }

    public Set<Entry> getEntries() {
        return this.entries;
    }

    public void setEntries(Set<Entry> entries) {
        if (this.entries != null) {
            this.entries.forEach(i -> i.removeTag(this));
        }
        if (entries != null) {
            entries.forEach(i -> i.addTag(this));
        }
        this.entries = entries;
    }

    public Tag entries(Set<Entry> entries) {
        this.setEntries(entries);
        return this;
    }

    public Tag addEntry(Entry entry) {
        this.entries.add(entry);
        entry.getTags().add(this);
        return this;
    }

    public Tag removeEntry(Entry entry) {
        this.entries.remove(entry);
        entry.getTags().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tag)) {
            return false;
        }
        return id != null && id.equals(((Tag) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tag{" +
            "id=" + getId() +
            ", camping='" + getCamping() + "'" +
            ", hike='" + getHike() + "'" +
            ", roadTrip='" + getRoadTrip() + "'" +
            ", international='" + getInternational() + "'" +
            ", soloTravel='" + getSoloTravel() + "'" +
            "}";
    }
}
