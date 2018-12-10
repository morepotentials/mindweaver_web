def get_forme_weaves():
    results =[]
    my_memberships = db(db.weave_membership.user_id == auth.user.id).select()

    for m in my_memberships:
        weave = db(db.weave.id == m.weave_id).select().first()
        if weave.creator != auth.user.email:
            results.append(dict(
            title=weave.title,
            purpose=weave.purpose,
            creator=weave.creator,
            members=db(db.weave_membership.weave_id == weave.id).select()
        ))
    
    return response.json(dict(results=results))


def get_fromme_weaves():
    results =[]
    for weave in db(db.weave.creator == auth.user.email).select():
        results.append(dict(
            title=weave.title,
            purpose=weave.purpose,
            creator=weave.creator,
            members=db(db.weave_membership.weave_id == weave.id).select(),
        ))
    return response.json(dict(results=results))


def get_forothers_weaves():
    results =[]
    for weave in db().select(db.weave.ALL, limitby=(0,10)):
        results.append(dict(
            title=weave.title,
            purpose=weave.purpose,
            creator=weave.creator,
            members=db(db.weave_membership.weave_id == weave.id).select(),
        )) 
    return response.json(dict(results=results))


def get_users():
    users = db(db.auth_user).select()
    return response.json(dict(results=users))
